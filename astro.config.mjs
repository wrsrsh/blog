// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://waris.asent.app',
  integrations: [mdx(), sitemap()],

  vite: {
      plugins: [tailwindcss()],
	},

  adapter: cloudflare(),
});