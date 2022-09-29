import ButtonArticleNavigation from '@/components/ButtonArticleNavigation'

import type { ComponentChildren, FunctionalComponent } from 'preact'

import style from './index.module.scss'

type PostInfo = {
  title: string
  id: string
}

type ContainerProps = {
  className?: string
  children?: ComponentChildren
  previousPost?: PostInfo
  nextPost?: PostInfo
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  previousPost,
  nextPost,
}: PresenterProps) => (
  <div className={`${className} ${style.navigation}`}>
    {previousPost && (
      <a href={`/blog/${previousPost.id}/`} className={style.link}>
        <ButtonArticleNavigation
          direction="prev"
          title={previousPost.title}
          className={style.button}
        />
      </a>
    )}

    {nextPost && (
      <a href={`/blog/${nextPost.id}/`} className={style.link}>
        <ButtonArticleNavigation
          direction="next"
          title={nextPost.title}
          className={style.button}
        />
      </a>
    )}
  </div>
)

export default function ArticleNavigation(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
