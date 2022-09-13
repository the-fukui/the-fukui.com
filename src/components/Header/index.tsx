import Logo from '@/components/Logo'
import Navigation from '@/components/Navigation'

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
}: PresenterProps) => (
  <header className={`${className} ${style.header}`}>
    <div className={style.logo}>
      {[...Array(3)].map((_, index) => (
        <Logo key={index} className={style['logo__' + (index + 1)]} />
      ))}
      <h1>
        <Logo className={style.logo__main} alt="ふくいのふ" />
      </h1>
    </div>
    <h2 className={style.description}>WEB ENGINEER</h2>
    <Navigation className={style.navigation} />
  </header>
)

export default function Header(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
