// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel/serverless';

const DEPLOY_TARGET = process.env.DEPLOY_TARGET || 'node';

// Determine whether to process environment variables based on the environment
const getEnvConfig = () => {
  // No additional environment variable processing needed in Docker environment
  if (process.env.DOCKER_ENV === 'true') {
    return {
      'import.meta.env.PUBLIC_OPENAI_API_KEY': 'process.env.PUBLIC_OPENAI_API_KEY',
      'import.meta.env.PUBLIC_ANTHROPIC_API_KEY': 'process.env.PUBLIC_ANTHROPIC_API_KEY',
      'import.meta.env.PUBLIC_GOOGLE_API_KEY': 'process.env.PUBLIC_GOOGLE_API_KEY',
      'import.meta.env.PUBLIC_DEEPSEEK_API_KEY': 'process.env.PUBLIC_DEEPSEEK_API_KEY',
      'import.meta.env.PUBLIC_DEFAULT_MODEL': 'process.env.PUBLIC_DEFAULT_MODEL',
      'import.meta.env.PUBLIC_SHOW_SETTINGS': 'process.env.PUBLIC_SHOW_SETTINGS',
      'import.meta.env.PUBLIC_ACCESS_PASSWORD': 'process.env.PUBLIC_ACCESS_PASSWORD'
    };
  }

  // Configuration for development and other environments
  return {
    'import.meta.env.PUBLIC_OPENAI_API_KEY': JSON.stringify(process.env.PUBLIC_OPENAI_API_KEY),
    'import.meta.env.PUBLIC_ANTHROPIC_API_KEY': JSON.stringify(process.env.PUBLIC_ANTHROPIC_API_KEY),
    'import.meta.env.PUBLIC_GOOGLE_API_KEY': JSON.stringify(process.env.PUBLIC_GOOGLE_API_KEY),
    'import.meta.env.PUBLIC_DEEPSEEK_API_KEY': JSON.stringify(process.env.PUBLIC_DEEPSEEK_API_KEY),
    'import.meta.env.PUBLIC_DEFAULT_MODEL': JSON.stringify(process.env.PUBLIC_DEFAULT_MODEL),
    'import.meta.env.PUBLIC_SHOW_SETTINGS': JSON.stringify(process.env.PUBLIC_SHOW_SETTINGS),
    'import.meta.env.PUBLIC_ACCESS_PASSWORD': JSON.stringify(process.env.PUBLIC_ACCESS_PASSWORD)
  };
};

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: DEPLOY_TARGET === 'vercel' ? vercel() : node({
    mode: 'standalone'
  }),
  server: {
    host: '0.0.0.0',
    port: 4321
  },
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    },
    ssr: {
      noExternal: ['@astrojs/node']
    },
    define: getEnvConfig()
  }
});
