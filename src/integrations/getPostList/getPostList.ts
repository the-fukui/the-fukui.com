import { load } from 'cheerio'
import dayjs from 'dayjs'

import { getAllBlogList } from '../../libs/microcms'
import { getAllQiitaPostList } from '../../libs/qiita'

/**
 * microCMSとQiitaから記事を取得してマージする（日付順）
 */
export const getPostList = async () => {
  const [microCMSPostList, _qiitaPostList] = await Promise.all([
    getAllBlogList(),
    getAllQiitaPostList(),
  ])

  //Qiitaの記事の最初の画像サムネイルとして取得する
  const qiitaThumbnails = await Promise.all(
    _qiitaPostList.map((post) => {
      // HTMLパースして、画像タグのdata-canonical-srcを取得
      const $ = load(post.rendered_body)
      const firstImageURL = $('img:not(.emoji)').attr('data-canonical-src')

      return {
        url: firstImageURL,
      }
      // return ogs({ url: post.url })
      //   .then(({ result }) => {
      //     if (!result.success || !result.ogImage) {
      //       console.log('failed to get open graph data')
      //       return undefined
      //     }

      //     return {
      //       url: (result.ogImage as typeof result.ogImage & { url: string }).url,
      //     }
      //   })
      //   .then((result) => {
      //     //Astro/imageでエンコード済み"/"が入ったURLはパースできないため、bitlyで短縮化する
      //     return result ? bitly.shorten(result.url) : undefined
      //   })
      //   .then((shortenURL) => {
      //     return {
      //       url: shortenURL?.link,
      //     }
      //   })
      //   .catch((e) => {
      //     console.log(e)
      //   })
    }),
  )

  // Qiita記事で必要なフィールド抽出と取得したサムネイルを設定
  const qiitaPostList = _qiitaPostList.map((post, i) => ({
    postType: 'qiita' as const,
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

  return sortedPosts
}

export type PostList = Awaited<ReturnType<typeof getPostList>>
