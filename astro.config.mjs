import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from "@astrojs/tailwind";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [tailwind()],
  vite: {
    plugins: [vanillaExtractPlugin()],
  },
});