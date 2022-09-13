import Navigation from '@/components/Navigation'

import type { FunctionalComponent, JSX } from 'preact'

// import style from './index.module.scss'

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
}: PresenterProps) => (
  <header className={`${className}`}>
    <Navigation />
  </header>
)

export default function Header(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
