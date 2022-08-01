interface ImportMetaEnv {
  readonly NODE_ENV: 'development' | 'production'
  readonly MICROCMS_SERVICE_DOMAIN: string
  readonly MICROCMS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace NodeJS {
  interface ProcessEnv extends ImportMetaEnv {}
}
