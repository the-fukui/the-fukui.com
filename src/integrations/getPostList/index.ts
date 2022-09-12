import type { AstroIntegration } from 'astro'
import fs from 'fs'
import path from 'path'

import { getPostList } from './getPostList'

const rootDir = path.resolve('./')

const createPlugin = (): AstroIntegration => {
  return {
    name: 'getPostList',

    hooks: {
      'astro:build:setup': async () => {
        const postList = await getPostList()

        try {
          fs.writeFileSync(
            path.join(rootDir, '/src/data/posts.json'),
            JSON.stringify(postList),
          )
        } catch (err) {
          console.error(err)
        }
      },
    },
  }
}

export default createPlugin
