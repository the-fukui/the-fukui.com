import { navigationList } from '@/state'
import { isExternalLink } from '@/utils'

import type { FunctionalComponent, JSX } from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
}

type PresenterProps = ReturnType<typeof Container> & {
  children?: JSX.Element[]
}

const Container = (props: ContainerProps) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
}: PresenterProps) => (
  <nav className={`${className}`}>
    <ul className={style.list}>
      {navigationList.map((item, index) => (
        <li
          key={item.id}
          className={style.item}
          style={{ animationDelay: index * 0.1 + 's' }}
        >
          <a
            href={item.href}
            {...(isExternalLink(item.href) && {
              rel: 'noopener noreferrer',
              target: '_blank',
            })}
            className={style.link}
          >
            {item.name}
            {isExternalLink(item.href) && (
              <img
                src="/img/external.svg"
                className={style.external}
                width="16"
                height="16"
                alt=""
              />
            )}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)

export default function Navigation(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
