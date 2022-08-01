import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tsconfigPaths from 'vite-tsconfig-paths';

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), image()],
  vite: {
    plugins: [tsconfigPaths()],
    ssr: {
      noExternal: ['destyle.css']
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
                    @use 'src/styles/color' as *;
                    @use 'src/styles/font' as *;
                    @use 'src/styles/size' as *;`
        }
      }
    }
  }
});