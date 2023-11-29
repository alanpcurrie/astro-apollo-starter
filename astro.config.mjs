import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from '@astrojs/react';
import solid from '@astrojs/solid-js';
import mdx from "@astrojs/mdx";
import remarkToc from 'remark-toc';
import rehypePresetMinify from 'rehype-preset-minify'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
    tailwind(),
    mdx(
      {
        optimize: true,
        syntaxHighlight: 'shiki',
        shikiConfig: { theme: 'dracula' },
        remarkPlugins: [remarkToc],
        rehypePlugins: [rehypePresetMinify],
        remarkRehype: { footnoteLabel: 'Footnotes' },
        gfm: false,
      }
    ),
    // react(),
    react({
      include: ['**/react/*'],
    }),
    solid({
      include: ['**/solid/*'],
    })
  ]
  ,
  vite: {
    plugins: [vanillaExtractPlugin()]
  }
});
