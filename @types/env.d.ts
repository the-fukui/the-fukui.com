interface ImportMetaEnv {
  readonly NODE_ENV: 'development' | 'production'
  readonly MICROCMS_SERVICE_DOMAIN: string
  readonly MICROCMS_API_KEY: string
  readonly QIITA_API_ENDPOINT: string
  readonly QIITA_API_KEY: string
  readonly STATIC_FORMS_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace NodeJS {
  interface ProcessEnv extends ImportMetaEnv {}
}
