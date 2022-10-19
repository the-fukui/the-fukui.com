import image from '@astrojs/image'
import preact from '@astrojs/preact'
import prefetch from '@astrojs/prefetch'
import compress from 'astro-compress'
import critters from 'astro-critters'
import { astroImageTools } from 'astro-imagetools'
import { defineConfig } from 'astro/config'
import tsconfigPaths from 'vite-tsconfig-paths'

import getPostList from './src/integrations/getPostList'

const isDev = import.meta.env.MODE === 'development'

// https://astro.build/config
export default defineConfig({
  site: 'https://the-fukui.com',
  integrations: [
    preact(),
    image(),
    astroImageTools,
    getPostList(),
    !isDev &&
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
      noExternal: ['destyle.css', 'react-imgix'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData(source, fp) {
            //全ファイルで共通のscssファイルをimportする
            //ただしここでimportしている_付き且つcssで終わるファイルを除く（avoid self-load）
            if (fp.includes('/_') && fp.endsWith('css')) return source

            return (
              `
            @use 'sass:color';
            @import 'src/styles/_color';
            @import 'src/styles/_size';
            @import 'src/styles/_font';
            @import 'src/styles/_animation';
            ` + source
            )
          },
        },
      },
    },
  },
})
