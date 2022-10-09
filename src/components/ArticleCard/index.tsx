import Image from '@/components/Image'

import dayjs from 'dayjs'
import type { FunctionalComponent, JSX } from 'preact'

import style from './index.module.scss'

const Mode = {
  reverse: 'reverse',
  'mini-reverse': 'mini-reverse',
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
}

type PresenterProps = ReturnType<typeof Container> & {
  children?: JSX.Element[]
}

const Container = (props: ContainerProps) => {
  const { date } = props

  const dateTime = dayjs(date).toISOString()
  const displayTime = dayjs(date).format('MMM D, YYYY')

  const presenterProps = {
    dateTime,
    displayTime,
  }
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  id,
  title,
  dateTime,
  displayTime,
  thumbnail,
  mode,
}: PresenterProps) => (
  <div className={`${className} ${style.card} ${mode && style[Mode[mode]]}`}>
    <time dateTime={dateTime} className={style.date}>
      {displayTime}
    </time>
    <a href={`/blog/${id}/`} className={style.title}>
      <h3>{title}</h3>
    </a>
    <a className={style.thumbnail} href={`/blog/${id}`}>
      <Image
        alt=""
        src={thumbnail?.url || import.meta.env.NO_IMAGE_URL}
        width={mode === 'mini-reverse' ? 200 : 400}
        height={mode === 'mini-reverse' ? 200 / 1.618 : 400 / 1.618}
      />
    </a>
  </div>
)

export default function ArticleCard(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
