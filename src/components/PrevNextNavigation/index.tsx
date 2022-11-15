import ButtonPrevNextNavigation from '@/components/ButtonPrevNextNavigation'
import { isExternalLink } from '@/utils'

import type { ComponentChildren, FunctionalComponent } from 'preact'

import style from './index.module.scss'

type PageInfo = {
  title: string
  id: string
  postType: 'qiita' | 'normal'
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
  const path = props.path.endsWith('/')
    ? (props.path = props.path.slice(0, -1))
    : props.path

  const pageUrl = (page: PageInfo) => {
    const pageUrlByPostTypes = {
      qiita: import.meta.env.PUBLIC_QIITA_POST_PATH,
      normal: path,
    } as const

    return pageUrlByPostTypes[page.postType] + '/' + page.id + '/'
  }

  const nextPageUrl = props.next ? pageUrl(props.next) : undefined
  const previousPageUrl = props.previous ? pageUrl(props.previous) : undefined

  const nextPageTitle = props.next?.title
  const previousPageTitle = props.previous?.title

  const presenterProps = {
    nextPageUrl,
    previousPageUrl,
    nextPageTitle,
    previousPageTitle,
  }
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  previousPageUrl,
  nextPageUrl,
  previousPageTitle,
  nextPageTitle,
}: PresenterProps) => (
  <div className={`${className} ${style.navigation}`}>
    {previousPageUrl && previousPageTitle && (
      <a
        href={previousPageUrl}
        {...(isExternalLink(previousPageUrl)
          ? { target: '_blank', rel: 'noreferrer' }
          : {})}
        className={`${style.link} ${style['link--prev']}`}
      >
        <ButtonPrevNextNavigation
          direction="prev"
          title={previousPageTitle}
          className={style.button}
        />
      </a>
    )}

    {nextPageUrl && nextPageTitle && (
      <a href={nextPageUrl} className={`${style.link} ${style['link--next']}`}>
        <ButtonPrevNextNavigation
          direction="next"
          title={nextPageTitle}
          {...(isExternalLink(nextPageUrl)
            ? { target: '_blank', rel: 'noreferrer' }
            : {})}
          className={style.button}
        />
      </a>
    )}
  </div>
)

export default function PrevNextNavigation(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
