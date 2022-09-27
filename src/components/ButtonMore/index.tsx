import BaseButton from '@/components/BaseButton'

import type { ComponentChildren, FunctionalComponent, JSX } from 'preact'

import style from './index.module.scss'

interface ContainerProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: ComponentChildren
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  ...buttonAttributes
}: PresenterProps) => (
  <BaseButton className={`${className} ${style.button}`} {...buttonAttributes}>
    More
  </BaseButton>
)

export default function ButtonMore(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
