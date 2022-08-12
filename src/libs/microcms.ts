import { createClient } from 'microcms-js-sdk'
import { loadEnv } from 'vite'

// Astro外からも使うので import.meta.env を使わない
const { MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY } = loadEnv(
  'production',
  process.cwd(),
  ''
)

const _client = createClient({
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
  apiKey: MICROCMS_API_KEY,
})

/**
 * Proxyで共通エラーハンドリング
 */
const handler: ProxyHandler<typeof _client> = {
  get: function (target, action: keyof typeof _client) {
    return (args: any) => {
      try {
        console.log('[microCMS] GET', args)
        return target[action](args)
      } catch (e) {
        console.log({ e })
        throw new Error(JSON.stringify(e))
      }
    }
  },
}

const client = new Proxy(_client, handler)

/**
 * PortfolioList
 */
export const getPortfolioList = client
  .getList<MicroCMSContent.Portfolio>({
    endpoint: 'portfolio',
    queries: {
      limit: 999,
    },
  })
  .then((res) => res.contents)

export const getProfile = client.getObject<MicroCMSContent.Profile>({
  endpoint: 'profile',
})

export const getSkillList = client
  .getList<MicroCMSContent.Skill>({
    endpoint: 'skills',
    queries: {
      limit: 999,
    },
  })
  .then((res) => res.contents)

export const getBlogList = client
  .getList<MicroCMSContent.Blog>({
    endpoint: 'blog',
    queries: {
      limit: 5,
    },
  })
  .then((res) => {
    return res.contents.map((post) => ({
      ...post,
      postType: 'normal' as const,
    }))
  })

export const getAllBlogList = client
  .getList<MicroCMSContent.Blog>({
    endpoint: 'blog',
    queries: {
      limit: 999,
      fields: 'id,title,date,thumbnail',
    },
  })
  .then((res) => {
    return res.contents.map((post) => ({
      ...post,
      postType: 'normal' as const,
    }))
  })

export const getBlog = (ID: string) =>
  client.get<MicroCMSContent.Blog>({
    endpoint: 'blog',
    contentId: ID,
  })
