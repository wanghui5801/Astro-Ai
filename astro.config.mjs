// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel/serverless';

const DEPLOY_TARGET = process.env.DEPLOY_TARGET || 'node';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: DEPLOY_TARGET === 'vercel' ? vercel() : node({
    mode: 'standalone'
  }),
  server: {
    host: true,
    port: 4321
  },
  vite: {
    css: {
      preprocessorOptions: {
        css: true
      }
    }
  }
});
