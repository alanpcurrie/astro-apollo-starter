import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from '@astrojs/react';
import mdx from "@astrojs/mdx";
import remarkToc from 'remark-toc';
import rehypePresetMinify from 'rehype-preset-minify'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [tailwind(), react(), mdx(
    {
      optimize: true,
      syntaxHighlight: 'shiki',
      shikiConfig: { theme: 'dracula' },
      remarkPlugins: [remarkToc],
      rehypePlugins: [rehypePresetMinify],
      remarkRehype: { footnoteLabel: 'Footnotes' },
      gfm: false,
    }
  )],
  vite: {
    plugins: [vanillaExtractPlugin()]
  }
});
