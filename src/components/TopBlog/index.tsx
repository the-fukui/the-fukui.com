import ArticleCard from '@/components/ArticleCard'
import ButtonMore from '@/components/ButtonMore'

import type {
  ComponentChildren,
  ComponentProps,
  FunctionalComponent,
} from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  children?: ComponentChildren
  posts: ComponentProps<typeof ArticleCard>[]
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  posts,
}: PresenterProps) => (
  <div className={`${className} ${style.blog}`}>
    <h2 className={style.title}>BLOG</h2>
    <ul className={style.list}>
      {posts.map((post) => (
        <li key={post.id} className={style.item}>
          <ArticleCard {...post} mode="mini-reverse" className={style.card} />
        </li>
      ))}
    </ul>
    <a href={'/blog/'} className={style.more}>
      <ButtonMore href="/blog" />
    </a>
  </div>
)

export default function TopBlog(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
