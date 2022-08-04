import { getAllBlogList } from '@libs/microcms'
import { getAllQiitaPostList } from '@libs/qiita'

import dayjs from 'dayjs'
import fs from 'fs'
import ogs from 'open-graph-scraper'

const [microCMSPostList, _qiitaPostList] = await Promise.all([
  getAllBlogList,
  getAllQiitaPostList,
])

//Qiitaの記事のOGP画像をサムネイルとして取得する
const qiitaPostList = _qiitaPostList.map((post) => {
  const { id, created_at, title, likes_count, url } = post
  const thumbnail = ogs({ url }).then(({ result }) => {
    if (!result.success) throw new Error('failed to get open graph data')

    return {
      url: result.ogImageURL,
      height: result.ogImageHeight,
      width: result.ogImageWidth,
    }
  })

  return {
    postType: 'qiita',
    id,
    createdAt: created_at,
    title,
    likes_count,
    url,
    thumbnail,
  }
})

const sortedPosts = [qiitaPostList, microCMSPostList].flat().sort((a, b) => {
  return dayjs(b.createdAt).isBefore(dayjs(a.createdAt)) ? 1 : -1
})

try {
  fs.writeFileSync('./', JSON.stringify(sortedPosts))
} catch (err) {
  console.error(err)
}

export default {}
