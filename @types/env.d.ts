interface ImportMetaEnv {
  readonly NODE_ENV: 'development' | 'production'
  readonly MICROCMS_SERVICE_DOMAIN: string
  readonly MICROCMS_API_KEY: string
  readonly QIITA_API_ENDPOINT: string
  readonly QIITA_API_KEY: string
  readonly PUBLIC_STATIC_FORMS_TOKEN: string
  readonly BITLY_API_KEY: string
  readonly NO_IMAGE_URL: string

  readonly PUBLIC_STATIC_FORMS_API_ENDPOINT: string
  readonly PUBLIC_SITE_TITLE: string
  readonly PUBLIC_SITE_DESCRIPTION: string
  readonly PUBLIC_TWITTER_USERNAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace NodeJS {
  interface ProcessEnv extends ImportMetaEnv {}
}
