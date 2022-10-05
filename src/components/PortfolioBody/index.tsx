import type { ComponentChildren, FunctionalComponent } from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  children?: ComponentChildren
  content: string
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  content,
}: PresenterProps) => (
  <div
    className={`${className} ${style.body}`}
    dangerouslySetInnerHTML={{ __html: content }}
  ></div>
)

export default function PortfolioBody(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
