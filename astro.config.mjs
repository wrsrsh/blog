// @ts-check

import mdx from '@astrojs/mdx';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://reshi.me',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/rss.xml'),
      serialize(item) {
        // Homepage
        if (item.url === 'https://reshi.me/') {
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 0.9;
          item.lastmod = new Date().toISOString();
          return item;
        }
        // Blog listing
        if (item.url === 'https://reshi.me/blog/') {
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 0.7;
          return item;
        }
        // Blog posts
        if (item.url.includes('/blog/')) {
          item.changefreq = ChangeFreqEnum.MONTHLY;
          item.priority = 0.8;
          return item;
        }
        // Everything else
        item.changefreq = ChangeFreqEnum.MONTHLY;
        item.priority = 0.5;
        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

   adapter: cloudflare({
    platformProxy: { enabled: true, configPath: "wrangler.jsonc", persist: true, },
   }),
});