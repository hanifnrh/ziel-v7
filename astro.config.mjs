// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// True only when running `astro dev` (i.e. `npm run dev`)
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://ziel.work',

  vite: {
    plugins: [tailwindcss()],   // ✅ KEEP THIS — it compiles Tailwind
  },

  integrations: [react(), sitemap()],

  // ✅ Skip the Netlify adapter entirely during `astro dev`.
  //    Production builds still get the adapter, so deploys work unchanged.
  adapter: isDev ? undefined : netlify(),
});