import OgpCard from '@/components/OgpCard'
import postList from '@/data/posts.json'
import type { PostList } from '@/integrations/getPostList'

import type { APIRoute } from 'astro'
import satori from 'satori'
import sharp from 'sharp'

export const getStaticPaths = async () => {
  const posts = postList.filter(
    (post) => post.postType === 'normal',
  ) as PostList
  return posts.map((post) => ({
    params: { slug: post.id },
  }))
}

/**
 * Google FontsからTTFファイルを取得する
 * @see https://github.com/vercel/satori/blob/main/playground/pages/api/font.js
 */
const loadGoogleFont = async ({
  text,
  font,
}: {
  text: string
  font: string
}) => {
  const API = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    text + '.',
  )}`

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })
  ).text()

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (!resource || !resource[1]) return

  const res = await fetch(resource[1])

  return res
}

/**
 * コンポーネントからSVGを生成する
 */
const createSVG = async ({ title }: { title: string }) =>
  satori(OgpCard({ title }) as React.ReactNode, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Noto+Sans+JP:wght@700',
        data: await loadGoogleFont({
          text: title,
          font: 'Noto+Sans+JP:wght@700',
        }).then((res) => res?.arrayBuffer() || new ArrayBuffer(0)),
        weight: 700,
        style: 'normal',
      },
    ],
  })

/*
 *SVGをPNGに変換する
 */
const convertSVGToPNG = (svg: string) =>
  sharp(Buffer.from(svg, 'utf-8'), { density: 72 * 2 }).toBuffer()

export const get: APIRoute = async ({ params }) => {
  const slug = params.slug as string
  const post = postList.find((post) => post.id === slug)

  const svg = await createSVG({ title: post?.title || '' })

  const pngBuffer = await convertSVGToPNG(svg)

  return {
    body: pngBuffer,
    encoding: 'binary',
  }
}
