import Image from '@/components/Image'

import type { ComponentChildren, FunctionalComponent } from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  children?: ComponentChildren
  url: string
  thumbnail: {
    url: string
  }
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
  title,
  url,
  thumbnail,
}: PresenterProps) => (
  <header className={`${className} ${style.header}`}>
    <h2 className={style.title}>{title}</h2>
    <Image
      className={style.thumbnail}
      src={thumbnail.url}
      alt={title + 'のサイト画像'}
      width={830}
      height={830}
    />
    <span className={style.type}>WEBSITE</span>
    <a
      href={url}
      className={style.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {url}
    </a>
  </header>
)

export default function PortfolioHeader(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
