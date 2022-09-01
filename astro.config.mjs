import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tsconfigPaths from 'vite-tsconfig-paths';
import image from "@astrojs/image";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://renew.the-fukui.com",
  integrations: [vue(), image(), compress()],
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
                    @use 'src/styles/size' as *;
                    @use 'src/styles/font' as *;`
        }
      }
    }
  }
});