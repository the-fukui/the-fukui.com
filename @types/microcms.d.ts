declare namespace MicroCMSContent {
  type MicroCMSContentId = import('microcms-js-sdk').MicroCMSContentId
  type MicroCMSDate = import('microcms-js-sdk').MicroCMSDate

  type Image = {
    url: string
    height: number
    width: number
  }

  export type Portfolio = {
    thumbnail: Image
    title: string
    content: string
    url: string
    period: string
    part: (PortfolioPart & MicroCMSContentId & MicroCMSDate)[]
    tech: (PortfolioTech & MicroCMSContentId & MicroCMSDate)[]
  }

  export type PortfolioPart = {
    name: string
    icon?: Image
  }

  export type PortfolioTech = {
    name: string
    icon?: Image
    url?: string
  }

  export type Blog = {
    date: string
    title: string
    thumbnail: Image
    content?: string
    rawContent?: string
  }

  export type Profile = {
    name?: string
    avatar?: Image
    content?: string
  }

  export type Skill = {
    type?: string
    skill?: string
  }

  export type NavigationItem = {
    name: string
    href: string
  }
}
