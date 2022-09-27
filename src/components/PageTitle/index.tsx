import type { ComponentChildren, FunctionalComponent } from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  children?: ComponentChildren
  secondaryTitle?: string
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  secondaryTitle,
  children,
}: PresenterProps) => {
  return secondaryTitle ? (
    <div className={`${style.wrapper} ${className}`}>
      <h2 className={style.title}>{children}</h2>
      <span className={style.secondary}>{secondaryTitle}</span>
    </div>
  ) : (
    <h2 className={`${className} ${style.title}`}>{children}</h2>
  )
}

export default function PageTitle(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
