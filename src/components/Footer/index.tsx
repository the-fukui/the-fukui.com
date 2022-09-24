import Logo from '@/components/Logo'

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
  <footer className={`${className} ${style.footer}`}>
    <a href="/">
      <Logo className={style.logo} />
    </a>
    <small className={style.copyright}>&copy; 2019 ふくい</small>
  </footer>
)

export default function Footer(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
