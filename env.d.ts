/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_OPENAI_API_KEY: string;
  readonly PUBLIC_ANTHROPIC_API_KEY: string;
  readonly PUBLIC_GOOGLE_API_KEY: string;
  readonly PUBLIC_DEEPSEEK_API_KEY: string;
  readonly PUBLIC_DEFAULT_MODEL: string;
  readonly PUBLIC_SHOW_SETTINGS: string;
  readonly PUBLIC_ACCESS_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv extends ImportMetaEnv {}
} 