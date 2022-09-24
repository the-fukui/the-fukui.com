import type { FunctionalComponent } from 'preact'

import Item from './ArticleItem'

// import style from './index.module.scss'

type ContainerProps = {
  className?: string
}

type PresenterProps = ReturnType<typeof Container> & {
  children?: typeof Item
}

const Container = (props: ContainerProps) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  children,
}: PresenterProps) => <ul className={`${className}`}>{children}</ul>

export default function ArticleList(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}

ArticleList.Item = Item
