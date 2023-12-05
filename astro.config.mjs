import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from '@astrojs/react';
import solid from '@astrojs/solid-js';
import mdx from "@astrojs/mdx";
import remarkToc from 'remark-toc';
import rehypePresetMinify from 'rehype-preset-minify';
import spotlightjs from "@spotlightjs/astro";

import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  experimental: {
    optimizeHoistedScript: true,
    contentCollectionCache: true
  },
  integrations: [
    sentry(), 
    spotlightjs(),
    tailwind(), 
    mdx({
    optimize: true,
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'dracula'
    },
    remarkPlugins: [remarkToc],
    rehypePlugins: [rehypePresetMinify],
    remarkRehype: {
      footnoteLabel: 'Footnotes'
    },
    gfm: false
  }), react({
    include: ['**/react/*']
  }), solid({
    include: ['**/solid/*']
  })],
  vite: {
    plugins: [vanillaExtractPlugin()]
  }
});