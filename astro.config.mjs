import image from '@astrojs/image'
import prefetch from '@astrojs/prefetch'
import vue from '@astrojs/vue'

import compress from 'astro-compress'
import { defineConfig } from 'astro/config'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://astro.build/config
export default defineConfig({
  site: 'https://renew.the-fukui.com',
  integrations: [
    vue(),
    image(),
    compress({
      img: false,
    }),
    prefetch({
      selector: "a[href^='/']",
    }),
  ],
  vite: {
    plugins: [tsconfigPaths()],
    ssr: {
      noExternal: ['destyle.css'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use 'src/styles/color' as *;
          @use 'src/styles/size' as *;
          @use 'src/styles/font' as *;`,
        },
      },
    },
  },
})
