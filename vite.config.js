import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [tsconfigPaths()],
  envPrefix: '',
})
