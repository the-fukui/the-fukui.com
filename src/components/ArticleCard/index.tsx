import dayjs from 'dayjs'
import type { FunctionalComponent, JSX } from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  id: string
  title: string
  date: string
  thumbnail: string
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
}: PresenterProps) => (
  <a className={`${className} ${style.card}`} href={`/blog/${id}`}>
    <h3>{title}</h3>
    <time dateTime={dateTime}>{displayTime}</time>
    <div
      className={style.thumbnail}
      dangerouslySetInnerHTML={{ __html: thumbnail }}
    />
  </a>
)

export default function ArticleCard(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
