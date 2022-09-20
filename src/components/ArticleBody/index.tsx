import type { FunctionalComponent, JSX } from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  html: string
}

type PresenterProps = ReturnType<typeof Container> & {
  children?: JSX.Element[]
}

const Container = (props: ContainerProps) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  html,
}: PresenterProps) => (
  <div
    className={`${className} ${style.body}`}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

export default function ArticleBody(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
