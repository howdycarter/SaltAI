import type { Voice } from "@/types/voice";

export const MOCK_VOICES: Voice[] = [
  {
    voice_id: "v-rachel-001",
    name: "Rachel",
    labels: {
      accent: "American",
      gender: "Female",
      age: "Young",
      description: "Calm and composed",
      use_case: "Narration",
    },
    preview_url: "https://example.com/audio/rachel.mp3",
  },
  {
    voice_id: "v-drew-002",
    name: "Drew",
    labels: {
      accent: "American",
      gender: "Male",
      age: "Middle-aged",
      description: "Well-rounded and warm",
      use_case: "News",
    },
    preview_url: "https://example.com/audio/drew.mp3",
  },
  {
    voice_id: "v-clyde-003",
    name: "Clyde",
    labels: {
      accent: "American",
      gender: "Male",
      age: "Middle-aged",
      description: "Deep and authoritative",
      use_case: "Characters",
    },
    preview_url: "https://example.com/audio/clyde.mp3",
  },
  {
    voice_id: "v-emily-004",
    name: "Emily",
    labels: {
      accent: "British",
      gender: "Female",
      age: "Young",
      description: "Bright and articulate",
      use_case: "Audiobook",
    },
    preview_url: "https://example.com/audio/emily.mp3",
  },
  {
    voice_id: "v-thomas-005",
    name: "Thomas",
    labels: {
      accent: "British",
      gender: "Male",
      age: "Old",
      description: "Gravelly and wise",
      use_case: "Narration",
    },
    preview_url: "https://example.com/audio/thomas.mp3",
  },
  {
    voice_id: "v-aria-006",
    name: "Aria",
    labels: {
      accent: "American",
      gender: "Female",
      age: "Young",
      description: "Soft and expressive",
      use_case: "Social Media",
    },
    preview_url: "https://example.com/audio/aria.mp3",
  },
  {
    voice_id: "v-daniel-007",
    name: "Daniel",
    labels: {
      accent: "Australian",
      gender: "Male",
      age: "Middle-aged",
      description: "Friendly and conversational",
      use_case: "Podcast",
    },
    preview_url: "https://example.com/audio/daniel.mp3",
  },
  {
    voice_id: "v-charlotte-008",
    name: "Charlotte",
    labels: {
      accent: "Swedish",
      gender: "Female",
      age: "Middle-aged",
      description: "Seductive and smooth",
      use_case: "Characters",
    },
    preview_url: "https://example.com/audio/charlotte.mp3",
  },
];
