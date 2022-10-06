import BaseButton from '@/components/BaseButton'

import type { ComponentChildren, FunctionalComponent, JSX } from 'preact'

import style from './index.module.scss'

interface ContainerProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: ComponentChildren
  direction: 'next' | 'prev'
  title: string
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  direction,
  title,
  ...buttonAttributes
}: PresenterProps) => (
  <BaseButton
    className={`${className} ${style.button} ${style[direction]}`}
    {...buttonAttributes}
  >
    {title}
  </BaseButton>
)

export default function ButtonPrevNextNavigation(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
