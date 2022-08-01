import { createClient } from 'microcms-js-sdk'

const _client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
})

/**
 * Proxyで共通エラーハンドリング
 */
const handler: ProxyHandler<typeof _client> = {
  get: function (target, action: keyof typeof _client) {
    return (args: any) => {
      try {
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
export const getPortfolioList = () =>
  client
    .getList<MicroCMSContent.Blog>({
      endpoint: 'portfolio',
      queries: {
        limit: 999,
      },
    })
    .then((res) => res.contents)
