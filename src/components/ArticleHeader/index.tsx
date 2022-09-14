import dayjs from 'dayjs'
import type { FunctionalComponent, JSX } from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  title: string
  date: string
  thumbnail: {
    url: string
    width: number
    height: number
  }
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
  title,
  dateTime,
  displayTime,
  thumbnail,
}: PresenterProps) => (
  <header className={`${className} ${style.header}`}>
    <img src={thumbnail.url} alt="" className={style.thumbnail} />
    <h1 className={style.title}>{title}</h1>
    <time dateTime={dateTime} className={style.date}>
      {displayTime}
    </time>
  </header>
)

export default function ArticleHeader(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
