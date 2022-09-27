import type { FunctionalComponent, JSX } from 'preact'

import style from './index.module.scss'

interface ContainerProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  className?: string
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  children,
  ...buttonAttributes
}: PresenterProps) => (
  <button className={`${className} ${style.button}`} {...buttonAttributes}>
    {children}
  </button>
)

export default function BaseButton(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
