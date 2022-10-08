import { createClient } from 'microcms-js-sdk'
import PromiseThrottle from 'promise-throttle'
import { loadEnv } from 'vite'

// Vite外からも使うので import.meta.env を使わない
const { MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY } = loadEnv(
  'production',
  process.cwd(),
  '',
) as ImportMetaEnv

const _client = createClient({
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
  apiKey: MICROCMS_API_KEY,
})

const promiseThrottle = new PromiseThrottle({
  requestsPerSecond: 60, // up to 1 request per second
  promiseImplementation: Promise, // the Promise library you are using
})

const cache = new Map()

/**
 * Proxyで
 * - 共通エラーハンドリング
 * - スロットリング(API limit対策)
 * - レスポンスキャッシュ
 */
const handler: ProxyHandler<typeof _client> = {
  get: function (target, action: keyof typeof _client) {
    return (args) => {
      // レスポンスキャッシュがあればそれを返す
      if (cache.has(JSON.stringify({ action, args }))) {
        console.log('[microCMS] GET (cached)', args)
        return cache.get(JSON.stringify({ action, args }))
      }

      // スロットリングでAPI limit対策
      const throttledRequest = promiseThrottle
        .add(() => {
          console.log('[microCMS] GET', args)
          return target[action](args)
        })
        .catch((e) => {
          console.log({ e, action, args })
          throw new Error(e)
        })

      // レスポンスキャッシュ
      cache.set(JSON.stringify({ action, args }), throttledRequest)

      return throttledRequest
    }
  },
}

const client = new Proxy(_client, handler)

/**
 * PortfolioList
 */
export const getPortfolioList = () =>
  client
    .getList<MicroCMSContent.Portfolio>({
      endpoint: 'portfolio',
      queries: {
        limit: 999,
      },
    })
    .then((res) => res.contents)

export const getProfile = () =>
  client.getObject<MicroCMSContent.Profile>({
    endpoint: 'profile',
  })

export const getSkillList = () =>
  client
    .getList<MicroCMSContent.Skill>({
      endpoint: 'skills',
      queries: {
        limit: 999,
      },
    })
    .then((res) => res.contents)

export const getBlogList = () =>
  client
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

export const getAllBlogList = () =>
  client
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

export const getPortfolio = (ID: string) =>
  client.getListDetail<MicroCMSContent.Portfolio>({
    endpoint: 'portfolio',
    contentId: ID,
  })

export const getNavigationList = () =>
  client.getList<MicroCMSContent.NavigationItem>({
    endpoint: 'navigation',
    queries: {
      limit: 999,
    },
  })
