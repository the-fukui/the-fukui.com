import Image from '@/components/Image'
import { isExternalLink } from '@/utils'

import dayjs from 'dayjs'
import type { FunctionalComponent, JSX } from 'preact'

import style from './index.module.scss'

// TODO: reverse状態をデフォルトにしてもよいかも
const Mode = {
  reverse: 'reverse',
  'mini-reverse': 'mini-reverse', // TOPのBlogセクション用
} as const

type ContainerProps = {
  className?: string
  id: string
  title: string
  date: string
  thumbnail?: {
    url: string
  }
  mode?: keyof typeof Mode
  postType: 'qiita' | 'normal'
}

type PresenterProps = ReturnType<typeof Container> & {
  children?: JSX.Element[]
}

const Container = (props: ContainerProps) => {
  const { date, postType, id } = props

  const postUrlByPostTypes = {
    qiita: import.meta.env.PUBLIC_QIITA_POST_PATH,
    normal: '/blog',
  } as const

  const dateTime = dayjs(date).toISOString()
  const displayTime = dayjs(date).format('MMM D, YYYY')
  const postUrl = postUrlByPostTypes[postType] + '/' + id + '/'

  const presenterProps = {
    dateTime,
    displayTime,
    postUrl,
  }
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  title,
  dateTime,
  displayTime,
  thumbnail,
  mode,
  postUrl,
}: PresenterProps) => (
  <div
    className={`${className} ${style.card} ${mode && style[Mode[mode]]}`}
    data-watch-is-scrolled
  >
    <time dateTime={dateTime} className={style.date}>
      {displayTime}
    </time>
    <a
      href={postUrl}
      className={style.title}
      {...(isExternalLink(postUrl)
        ? { target: '_blank', rel: 'noreferrer' }
        : {})}
    >
      <h3>{title}</h3>
    </a>
    <a
      className={style.thumbnail}
      href={postUrl}
      {...(isExternalLink(postUrl)
        ? { target: '_blank', rel: 'noreferrer' }
        : {})}
    >
      <Image
        alt=""
        src={thumbnail?.url || import.meta.env.PUBLIC_NO_IMAGE_URL}
        width={mode === 'mini-reverse' ? 200 : 400}
        height={mode === 'mini-reverse' ? 200 / 1.618 : 400 / 1.618}
      />
    </a>
  </div>
)

export default function ArticleCard(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
