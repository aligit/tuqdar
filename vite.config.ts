/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog, { type PrerenderContentFile } from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/tuqdar/',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      static: true,
      vite: {
        // Required to use the Analog SFC format
        experimental: {
          supportAnalogFormat: true,
        },
        inlineStylesExtension: 'scss',
      },
      prerender: {
        routes: async () => [
          '/',
          '/about',
          '/contact',
          {
            contentDir: 'src/content/properties',
            transform: (file: PrerenderContentFile) => {
              // Access 'draft' using bracket notation
              if (file.attributes['draft']) {
                return false;
              }
              // Use the slug from attributes if defined, otherwise use the file's basename
              const slug = file.attributes['slug'] || file.name;
              return `/property/${slug}`;
            },
          },
        ],
        sitemap: {
          host: 'https://www.yourdomain.com/',
        },
        postRenderingHooks: [
          async (route) => {
            // Add custom analytics script or other post-rendering modifications
            const analyticsScript = `<script>/* Your analytics code */</script>`;
            route.contents = route.contents?.concat(analyticsScript);
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
