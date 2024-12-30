// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  server: {
    host: true,
    port: 4321
  },
  adapter: vercel(),
  vite: {
    css: {
      preprocessorOptions: {
        css: true
      }
    }
  }
});
