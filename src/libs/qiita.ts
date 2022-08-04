import type { QiitaAPIV2JSONSchema } from './qiita-types'

const headers = new Headers()
headers.append('Authorization', `Bearer ${import.meta.env.QIITA_API_KEY}`)

const options: RequestInit = {
  method: 'GET',
  headers,
  redirect: 'follow',
}

type QiitaAPIV2JSONSchemaWithAuthenticatedItem = QiitaAPIV2JSONSchema & {
  'authenticated_user/items': QiitaAPIV2JSONSchema['item'][]
}
type QiitaQueryParams = {
  page?: number
  per_page?: number
  [key: string]: string | number | undefined
}
type EndpointPaths =
  keyof RemoveIndex<QiitaAPIV2JSONSchemaWithAuthenticatedItem>

const client = {
  get: <T extends EndpointPaths>({
    path,
    query,
  }: {
    path: T
    query?: QiitaQueryParams
  }) => {
    const queryParams = new URLSearchParams()
    for (const [key, value] of Object.entries(query || {})) {
      queryParams.append(key, String(value))
    }

    try {
      return fetch(
        `${import.meta.env.QIITA_API_ENDPOINT}/${path}?${queryParams}`,
        options
      ).then(
        (data) =>
          data.json() as Promise<QiitaAPIV2JSONSchemaWithAuthenticatedItem[T]>
      )
    } catch (e) {
      console.log(e)
      throw new Error(JSON.stringify(e))
    }
  },
}

export const getAllQiitaPostList = client.get({
  path: 'authenticated_user/items',
})
