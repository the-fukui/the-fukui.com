import type { AstroIntegration } from 'astro'
import fs from 'fs'
import path from 'path'

import { getPostList } from './getPostList'

export type { PostList } from './getPostList'

const rootDir = path.resolve('./')

/**
 * build時にgetPostListを実行し、結果をJSONファイルに出力する
 */
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
            { flag: 'w' },
          )
        } catch (err) {
          console.error(err)
        }
      },
    },
  }
}

export default createPlugin
