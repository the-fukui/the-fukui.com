import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

/**
 * Astro外からmicroCMSとQiitaの記事を事前に取得するスクリプトを動かすのに必要
 */

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [tsconfigPaths()],
})
