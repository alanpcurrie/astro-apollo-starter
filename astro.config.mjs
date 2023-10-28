import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from "@astrojs/tailwind";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [tailwind()],
  vite: {
    plugins: [vanillaExtractPlugin()],
  },
});