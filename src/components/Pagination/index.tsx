import type { FunctionalComponent, JSX } from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  totalCount: number
  current: number
  rootPath?: string
}

type PresenterProps = ReturnType<typeof Container> & {
  children?: JSX.Element[]
}

const Container = (props: ContainerProps) => {
  const { totalCount, current } = props

  const middle = (() => {
    switch (true) {
      case current === 1 || current === 2:
      default:
        return [2, 3]
      case current >= 3 && current + 1 < totalCount:
        return [current - 1, current, current + 1]
      case current === totalCount - 1:
        return [current - 1, current]
      case current === totalCount && totalCount === 3:
        return [current - 1]
      case current === totalCount:
        return [current - 2, current - 1]
    }
  })()

  const presenterProps = {
    middle,
  }
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  middle,
  totalCount,
  current,
  rootPath = '/',
}: PresenterProps) => (
  <ul className={`${className} ${style.pagination}`}>
    <li className={`${style.page}  ${current === 1 && style.active}`}>
      <a href={rootPath} className={style.page__link}>
        1
      </a>
    </li>
    {2 === totalCount && (
      <li className={`${style.page}  ${current === 2 && style.active}`}>
        <a href={`${rootPath}2/`} className={style.page__link}>
          2
        </a>
      </li>
    )}
    {1 < current - 2 && <li className={`${style.page} ${style.gap}`}>…</li>}

    {2 < totalCount &&
      middle.map((num) => (
        <li
          key={num}
          className={`${style.page} ${style.middle}  ${
            current === num && style.active
          }`}
        >
          <a href={`${rootPath}${num}/`} className={style.page__link}>
            {num}
          </a>
        </li>
      ))}

    {current + 2 < totalCount && (
      <li className={`${style.page} ${style.gap}`}>…</li>
    )}
    {3 === totalCount && 2 !== current && 1 !== current && (
      <li className={`${style.page}  ${current === 3 && style.active}`}>
        <a href={`${rootPath}3/`} className={style.page__link}>
          3
        </a>
      </li>
    )}
    {3 < totalCount && (
      <li
        className={`${style.page}  ${current === totalCount && style.active}`}
      >
        <a href={`${rootPath}${totalCount}/`} className={style.page__link}>
          {totalCount}
        </a>
      </li>
    )}
  </ul>
)

export default function Pagination(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
