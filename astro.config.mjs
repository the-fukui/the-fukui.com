import image from '@astrojs/image'
import preact from '@astrojs/preact'
import prefetch from '@astrojs/prefetch'
import sitemap from '@astrojs/sitemap'

import compress from 'astro-compress'
import critters from 'astro-critters'
import { defineConfig } from 'astro/config'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://astro.build/config
export default defineConfig({
  site: 'https://renew.the-fukui.com',
  integrations: [
    preact(),
    image(),
    prefetch({
      selector: "a[href^='/']",
    }),
    critters(),
    sitemap(),
    compress({
      img: false,
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
