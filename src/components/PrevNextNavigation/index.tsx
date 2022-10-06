import ButtonPrevNextNavigation from '@/components/ButtonPrevNextNavigation'

import type { ComponentChildren, FunctionalComponent } from 'preact'

import style from './index.module.scss'

type PageInfo = {
  title: string
  id: string
}

type ContainerProps = {
  className?: string
  children?: ComponentChildren
  previous?: PageInfo
  next?: PageInfo
  path: string
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  /** Logic here */

  const path = props.path.endsWith('/')
    ? (props.path = props.path.slice(0, -1))
    : props.path

  const presenterProps = { path }
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  previous,
  next,
  path,
}: PresenterProps) => (
  <div className={`${className} ${style.navigation}`}>
    {previous && (
      <a
        href={`${path}/${previous.id}/`}
        className={`${style.link} ${style['link--prev']}`}
      >
        <ButtonPrevNextNavigation
          direction="prev"
          title={previous.title}
          className={style.button}
        />
      </a>
    )}

    {next && (
      <a
        href={`${path}/${next.id}/`}
        className={`${style.link} ${style['link--next']}`}
      >
        <ButtonPrevNextNavigation
          direction="next"
          title={next.title}
          className={style.button}
        />
      </a>
    )}
  </div>
)

export default function PrevNextNavigation(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
