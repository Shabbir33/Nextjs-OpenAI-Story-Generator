import { GPTScript } from "@gptscript-ai/gptscript";

const g = new GPTScript({
  APIKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export default g;
