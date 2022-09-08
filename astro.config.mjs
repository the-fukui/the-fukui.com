import image from '@astrojs/image'
import preact from '@astrojs/preact'
import prefetch from '@astrojs/prefetch'

import compress from 'astro-compress'
import critters from 'astro-critters'
import { defineConfig } from 'astro/config'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact(),
    image(),
    prefetch({
      selector: "a[href^='/']",
    }),
    critters(),
    compress({
      img: false,
    }),
  ],
  vite: {
    plugins: [tsconfigPaths()],
  },
})
