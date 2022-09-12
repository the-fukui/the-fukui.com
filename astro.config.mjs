import image from '@astrojs/image'
import preact from '@astrojs/preact'
import prefetch from '@astrojs/prefetch'
import compress from 'astro-compress'
import critters from 'astro-critters'
import { defineConfig } from 'astro/config'
import tsconfigPaths from 'vite-tsconfig-paths'

import getPostList from './src/integrations/getPostList'

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact(),
    image(),
    getPostList(),
    prefetch({
      selector: "a[href^='/']",
    }),
    critters({
      pruneSource: true,
    }),
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
