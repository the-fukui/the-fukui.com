declare namespace MicroCMSContent {
  export type Blog = {
    date: string
    title?: string
    thumbnail?: {
      url: string
      height: number
      width: number
    }
    content?: string
    rawContent?: string
  }
}
