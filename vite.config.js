import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteSitemap } from 'vite-plugin-sitemap';
import { viteSSG } from 'vite-ssg';

export default defineConfig({
  plugins: [
    react(),
    viteSSG(),
    ViteSitemap({
      baseUrl: 'https://www.enoticiapara.com.br', // Adicionando Seo ao site
      generateRobotsTxt: true,
    }),
  ],
});
