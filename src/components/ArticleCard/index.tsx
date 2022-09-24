import dayjs from 'dayjs'
import type { FunctionalComponent, JSX } from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  id: string
  title: string
  date: string
  thumbnail: string
  reverse?: boolean
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
  reverse,
}: PresenterProps) => (
  <div className={`${className} ${style.card} ${reverse && style.reverse}`}>
    <time dateTime={dateTime} className={style.date}>
      {displayTime}
    </time>
    <a href={`/blog/${id}/`} className={style.title}>
      <h3>{title}</h3>
    </a>
    <a
      className={style.thumbnail}
      dangerouslySetInnerHTML={{ __html: thumbnail }}
      href={`/blog/${id}`}
    />
  </div>
)

export default function ArticleCard(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
