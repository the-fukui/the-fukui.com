import type { JSXInternal } from 'preact/src/jsx'
import { FC, createElement } from 'react'

// import style from './index.module.scss'

type ContainerProps<T extends keyof JSXInternal.IntrinsicElements> = {
  className?: string
  as?: keyof JSXInternal.IntrinsicElements
} & JSXInternal.IntrinsicElements[T]

type PresenterProps = ReturnType<typeof Container>

const Container = <T extends keyof JSXInternal.IntrinsicElements>(
  props: ContainerProps<T>,
) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const Presenter: FC<PresenterProps> = ({
  className,
  // children,
  as: tagName = 'div',
  ...props
}: PresenterProps) => createElement(tagName, { className, ...props })

export default function DynamicTag<
  T extends keyof JSXInternal.IntrinsicElements,
>(props: ContainerProps<T>) {
  return <Presenter {...Container<T>(props)} />
}
