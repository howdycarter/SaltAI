"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

type AgentState = null | "thinking" | "listening" | "talking";

type OrbProps = {
  colors?: [string, string];
  agentState?: AgentState;
  volumeMode?: "auto" | "manual";
  manualInput?: number;
  manualOutput?: number;
  getInputVolume?: () => number;
  getOutputVolume?: () => number;
  seed?: number;
  className?: string;
};

/* ------------------------------------------------------------------ */
/*  PRNG – splitmix32                                                  */
/* ------------------------------------------------------------------ */
function splitmix32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x9e3779b9) | 0;
    let t = seed ^ (seed >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    t = t ^ (t >>> 15);
    return (t >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ */
/*  GLSL shaders                                                       */
/* ------------------------------------------------------------------ */
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uInputVolume;
  uniform float uOutputVolume;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uOpacity;
  uniform float uDarkMode;
  uniform vec2 uOffsets[7];

  varying vec2 vUv;

  #define PI 3.14159265359

  // simple value noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float dist = length(uv);

    // discard outside circle
    if (dist > 1.0) discard;

    float t = uTime * uSpeed;

    // animated blobs
    float pattern = 0.0;
    for (int i = 0; i < 7; i++) {
      vec2 offset = uOffsets[i];
      float phase = t * (0.3 + offset.x * 0.4) + offset.y * PI * 2.0;
      float blobAngle = phase + float(i) * PI * 2.0 / 7.0;
      float blobDist = 0.3 + 0.15 * sin(phase * 0.7);
      vec2 blobCenter = vec2(cos(blobAngle), sin(blobAngle)) * blobDist;

      float vol = max(uInputVolume, uOutputVolume);
      float blobSize = 0.25 + vol * 0.15;
      float d = length(uv - blobCenter);
      pattern += smoothstep(blobSize, 0.0, d) * (0.5 + offset.x * 0.5);
    }

    // noise distortion
    float n = fbm(uv * 2.0 + t * 0.3);
    pattern += n * 0.3;

    // rings
    float ring1 = smoothstep(0.02, 0.0, abs(dist - 0.5 - n * 0.1));
    float ring2 = smoothstep(0.02, 0.0, abs(dist - 0.75 - n * 0.05));
    pattern += (ring1 + ring2) * 0.15;

    // normalize and clamp
    pattern = clamp(pattern, 0.0, 1.0);

    // color ramp: black -> color1 -> color2 -> white
    vec3 col;
    if (pattern < 0.33) {
      float t2 = pattern / 0.33;
      vec3 dark = mix(vec3(0.0), vec3(0.15), uDarkMode);
      col = mix(dark, uColor1, t2);
    } else if (pattern < 0.66) {
      float t2 = (pattern - 0.33) / 0.33;
      col = mix(uColor1, uColor2, t2);
    } else {
      float t2 = (pattern - 0.66) / 0.34;
      col = mix(uColor2, vec3(1.0), t2 * 0.5);
    }

    // edge fade
    float edgeFade = smoothstep(1.0, 0.85, dist);
    float alpha = edgeFade * uOpacity;

    gl_FragColor = vec4(col, alpha);
  }
`;

/* ------------------------------------------------------------------ */
/*  OrbMesh – the Three.js scene content                               */
/* ------------------------------------------------------------------ */
function OrbMesh({
  colors,
  agentState,
  volumeMode,
  manualInput,
  manualOutput,
  getInputVolume,
  getOutputVolume,
  seed,
}: Omit<OrbProps, "className">) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const materialRef = React.useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();

  // volume smoothing refs
  const curInRef = React.useRef(0);
  const curOutRef = React.useRef(0);
  const animSpeedRef = React.useRef(0.5);
  const opacityRef = React.useRef(0);

  // target colors
  const targetColor1 = React.useRef(new THREE.Color(colors?.[0] ?? "#CADCFC"));
  const targetColor2 = React.useRef(new THREE.Color(colors?.[1] ?? "#A0B9D1"));

  // dark mode detection
  const darkModeRef = React.useRef(0);

  React.useEffect(() => {
    const check = () => {
      darkModeRef.current = document.documentElement.classList.contains("dark")
        ? 1
        : 0;
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // update target colors when prop changes
  React.useEffect(() => {
    targetColor1.current.set(colors?.[0] ?? "#CADCFC");
    targetColor2.current.set(colors?.[1] ?? "#A0B9D1");
  }, [colors]);

  // generate blob offsets from seed
  const offsets = React.useMemo(() => {
    const rng = splitmix32(seed ?? 42);
    const result: number[] = [];
    for (let i = 0; i < 14; i++) {
      result.push(rng());
    }
    return result;
  }, [seed]);

  // WebGL context recovery
  React.useEffect(() => {
    const canvas = gl.domElement;
    const handleLost = (e: Event) => {
      e.preventDefault();
      setTimeout(() => gl.forceContextRestore(), 1);
    };
    canvas.addEventListener("webglcontextlost", handleLost);
    return () => canvas.removeEventListener("webglcontextlost", handleLost);
  }, [gl]);

  // uniforms
  const uniforms = React.useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: 0.5 },
      uInputVolume: { value: 0 },
      uOutputVolume: { value: 0 },
      uColor1: { value: new THREE.Color(colors?.[0] ?? "#CADCFC") },
      uColor2: { value: new THREE.Color(colors?.[1] ?? "#A0B9D1") },
      uOpacity: { value: 0 },
      uDarkMode: { value: 0 },
      uOffsets: {
        value: Array.from({ length: 7 }, (_, i) => [
          offsets[i * 2],
          offsets[i * 2 + 1],
        ]).flat(),
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    const mat = materialRef.current;

    // advance time
    mat.uniforms.uTime.value += delta;

    // compute target volumes based on agentState
    let targetIn = 0;
    let targetOut = 0.3;
    const time = mat.uniforms.uTime.value;

    if (volumeMode === "manual") {
      targetIn = manualInput ?? 0;
      targetOut = manualOutput ?? 0;
    } else {
      if (getInputVolume) targetIn = getInputVolume();
      if (getOutputVolume) targetOut = getOutputVolume();

      // agent state overrides
      switch (agentState) {
        case "listening":
          targetIn = 0.55 + Math.sin(time * 2) * 0.2;
          targetOut = 0.45;
          break;
        case "talking":
          targetIn = 0.4 + Math.sin(time * 3) * 0.15;
          targetOut = 0.7 + Math.sin(time * 2.5) * 0.2;
          break;
        case "thinking":
          targetIn = 0.15 + Math.sin(time * 0.8) * 0.1;
          targetOut = 0.2 + Math.cos(time * 0.6) * 0.1;
          break;
        default:
          targetIn = 0;
          targetOut = 0.3;
      }
    }

    // smooth volume lerp
    curInRef.current += (targetIn - curInRef.current) * 0.2;
    curOutRef.current += (targetOut - curOutRef.current) * 0.2;
    mat.uniforms.uInputVolume.value = curInRef.current;
    mat.uniforms.uOutputVolume.value = curOutRef.current;

    // animation speed driven by output volume
    const targetSpeed = 0.3 + curOutRef.current * 0.8;
    animSpeedRef.current += (targetSpeed - animSpeedRef.current) * 0.12;
    mat.uniforms.uSpeed.value = animSpeedRef.current;

    // opacity fade in
    opacityRef.current += (1 - opacityRef.current) * 0.05;
    mat.uniforms.uOpacity.value = opacityRef.current;

    // color interpolation
    mat.uniforms.uColor1.value.lerp(targetColor1.current, 0.08);
    mat.uniforms.uColor2.value.lerp(targetColor2.current, 0.08);

    // dark mode
    mat.uniforms.uDarkMode.value = darkModeRef.current;
  });

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[1, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Orb – public component                                             */
/* ------------------------------------------------------------------ */
function Orb({
  colors = ["#CADCFC", "#A0B9D1"],
  agentState = null,
  volumeMode = "auto",
  manualInput = 0,
  manualOutput = 0,
  getInputVolume,
  getOutputVolume,
  seed = 42,
  className,
}: OrbProps) {
  return (
    <div
      data-slot="orb"
      data-state={agentState ?? "idle"}
      className={cn("relative h-full w-full", className)}
    >
      <Canvas
        orthographic
        camera={{ zoom: 100, position: [0, 0, 1] }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
        resize={{ debounce: 100 }}
      >
        <OrbMesh
          colors={colors}
          agentState={agentState}
          volumeMode={volumeMode}
          manualInput={manualInput}
          manualOutput={manualOutput}
          getInputVolume={getInputVolume}
          getOutputVolume={getOutputVolume}
          seed={seed}
        />
      </Canvas>
    </div>
  );
}

export { type AgentState, Orb, type OrbProps };
