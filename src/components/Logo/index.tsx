import type { FunctionalComponent, JSX } from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  alt?: string
  dark?: boolean
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
  alt = '',
  dark = false,
}: PresenterProps) => (
  <img
    src="/img/logo.svg"
    className={`${className} ${dark && style.dark}`}
    alt={alt}
    width="556.719"
    height="100.714"
  />
)

export default function Logo(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
