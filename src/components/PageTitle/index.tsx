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
  <h2 className={`${className} ${style.title}`}>{children}</h2>
)

export default function PageTitle(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
