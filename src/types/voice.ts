export type Voice = {
  voice_id: string;
  name: string;
  labels?: {
    accent?: string;
    gender?: string;
    age?: string;
    description?: string;
    use_case?: string;
  };
  preview_url?: string;
};
