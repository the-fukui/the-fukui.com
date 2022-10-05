import DynamicTag from '@/components/DynamicTag'
import Image from '@/components/Image'

import type { ComponentChildren, FunctionalComponent } from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  children?: ComponentChildren
  part: {
    name: string
    icon: {
      url: string
      width: number
      height: number
    }
  }[]
  tech: {
    name: string
    icon: {
      url: string
      width: number
      height: number
    }
    url?: string
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
  tech,
  part,
}: PresenterProps) => (
  <div className={`${className} ${style.detail}`}>
    <h2 className={`${style.heading} ${style['heading--tech']}`}>TECH</h2>
    <span className={`${style['sub-heading']} ${style['sub-heading--tech']}`}>
      使用技術
    </span>
    <ul className={`${style['list']} ${style['list--tech']}`}>
      {tech.map((item) => (
        <li
          key={item.name}
          className={`${style['item']} ${style['item--tech']}`}
        >
          <DynamicTag
            as={item.url ? 'a' : 'div'}
            href={item.url}
            target={item.url ? '_blank' : undefined}
            rel={item.url ? 'noopener noreferrer' : undefined}
          >
            <>
              <Image
                src={item.icon.url}
                width={100}
                height={item.icon.height * (100 / item.icon.width)}
                className={style['item--tech__icon']}
              />
              <span className={style['item--tech__name']}>{item.name}</span>
            </>
          </DynamicTag>
        </li>
      ))}
    </ul>
    <h2 className={`${style.heading} ${style['heading--part']}`}>PART</h2>
    <span className={`${style['sub-heading']} ${style['sub-heading--part']}`}>
      制作箇所
    </span>
    <ul className={`${style['list']} ${style['list--part']}`}>
      {part.map((item) => (
        <li
          key={item.name}
          className={`${style['item']} ${style['item--part']}`}
        >
          <Image
            src={item.icon.url}
            width={100}
            height={item.icon.height * (100 / item.icon.width)}
            className={style['item--part__icon']}
          />
          <span className={style['item--part__name']}>{item.name}</span>
        </li>
      ))}
    </ul>
  </div>
)

export default function PortfolioDetail(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
