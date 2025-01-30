/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog, { PrerenderContentFile } from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      ssr: false,
      static: true,
      prerender: {
        discover: true,
        routes: async () => [
          '/',
          '/about',
          '/contact',
          // Use only if static
          // {
          //   contentDir: 'src/content/properties',
          //   transform: (file: PrerenderContentFile) => {
          //     // Access 'draft' using bracket notation
          //     if (file.attributes['draft']) {
          //       return false;
          //     }
          //     // Use the slug from attributes if defined, otherwise use the file's basename
          //     const slug = file.attributes['slug'] || file.name;
          //     return `/property/${slug}`;
          //   },
          // },
        ],
        sitemap: {
          host: 'https://aligit.github.io/tuqdar/',
        },
        postRenderingHooks: [
          async (route) => {
            // Add custom analytics script or other post-rendering modifications
            const analyticsScript = `<script>/* Your analytics code */</script>`;
            route.contents = route.contents?.concat(analyticsScript);
          },
        ],
      },
      vite: {
        experimental: { supportAnalogFormat: true },
        inlineStylesExtension: 'scss',
      },
    }),
  ],
}));
