import { getAllBlogList } from '@libs/microcms'
import { getAllQiitaPostList } from '@libs/qiita'

import dayjs from 'dayjs'
import fs from 'fs'
import ogs from 'open-graph-scraper'

/**
 * microCMSとQiitaから記事を取得してマージしてjson書き出し（日付順）
 */

const [microCMSPostList, _qiitaPostList] = await Promise.all([
  getAllBlogList,
  getAllQiitaPostList,
])

//Qiitaの記事のOGP画像をサムネイルとして取得する
const qiitaThumbnails = await Promise.all(
  _qiitaPostList.map((post) => {
    return ogs({ url: post.url }).then(({ result }) => {
      if (!result.success || !result.ogImage) {
        console.log('failed to get open graph data')
        return undefined
      }

      return {
        url: (result.ogImage as typeof result.ogImage & { url: string }).url,
      }
    })
  })
)

// Qiita記事で必要なフィールド抽出と取得したサムネイルを設定
const qiitaPostList = _qiitaPostList.map((post, i) => ({
  postType: 'Qiita' as const,
  id: post.id,
  title: post.title,
  likes_count: post.likes_count,
  url: post.url,
  thumbnail: qiitaThumbnails[i],
  date: post.created_at,
}))

//マージして日付順に並び替え
const sortedPosts = [qiitaPostList, microCMSPostList].flat().sort((a, b) => {
  return dayjs(b.date).isAfter(dayjs(a.date)) ? 1 : -1
})

try {
  fs.writeFileSync(__dirname + '/posts.json', JSON.stringify(sortedPosts))
} catch (err) {
  console.error(err)
}

export type PostList = typeof sortedPosts
