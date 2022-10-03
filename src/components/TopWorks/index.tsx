import Image from '@/components/Image'

import type { ComponentChildren, FunctionalComponent } from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  children?: ComponentChildren
  portfolios: {
    id: string
    title: string
    thumbnail: {
      url: string
    }
  }[]
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  portfolios,
}: PresenterProps) => (
  <div className={`${className} ${style.works}`}>
    <h2 className={style.title}>
      WORKS<span className={style.title__secondary}>制作したサイトなど</span>
    </h2>
    <ul className={style.portfolios}>
      {portfolios.map((portfolio) => (
        <li key={portfolio.id} className={style.portfolio}>
          <a
            href={`/portfolio/${portfolio.id}/`}
            className={style.portfolio__thumbnail}
          >
            <Image
              alt={portfolio.title}
              src={portfolio.thumbnail.url}
              width={304}
              height={304}
            />
          </a>
        </li>
      ))}
    </ul>
  </div>
)

export default function TopWorks(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
