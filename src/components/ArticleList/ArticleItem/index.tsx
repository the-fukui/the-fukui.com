import type { FunctionalComponent, JSX } from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
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
  children,
}: PresenterProps) => (
  <li className={`${className} ${style.item}`}>{children}</li>
)

export default function ArticleItem(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
