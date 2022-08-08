declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MICROCMS_SERVICE_DOMAIN: string
      MICROCMS_API_KEY: string
      STATIC_FORMS_TOKEN: string
      QIITA_API_ENDPOINT: string
      QIITA_API_KEY: string
    }
  }
}

export {}
