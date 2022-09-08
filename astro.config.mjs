import preact from '@astrojs/preact'

import critters from 'astro-critters'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), critters()],
})
