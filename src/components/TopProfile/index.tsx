import Image from '@/components/Image'

import type { ComponentChildren, FunctionalComponent } from 'preact'

import style from './index.module.scss'

const LINKS = [
  {
    name: 'twitter',
    href: 'https://twitter.com/var_fukui',
    icon: '/img/twitter.svg',
    width: 512,
    height: 512,
  },
  {
    name: 'github',
    href: 'https://github.com/the-fukui',
    icon: '/img/github.svg',
    width: 24,
    height: 24,
  },
  {
    name: 'qiita',
    href: 'https://qiita.com/the_fukui',
    icon: '/img/qiita_text.svg',
    width: 500,
    height: 208,
  },
  {
    name: 'npm',
    href: 'https://www.npmjs.com/~the-fukui',
    icon: '/img/npm.svg',
    width: 780,
    height: 250,
  },
]

type ContainerProps = {
  className?: string
  children?: ComponentChildren
  text: string
  name: string
  avatar: {
    url: string
  }
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  text,
  name,
  avatar,
}: PresenterProps) => (
  <div className={`${className} ${style.profile}`}>
    <h2 className={`${style.title} ${style.intersected}`}>PROFILE</h2>
    <div className={style.text} dangerouslySetInnerHTML={{ __html: text }} />
    <ul className={style.links}>
      {LINKS.map((item) => (
        <li className={style.links__item} key={item.name}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={style.links__link}
          >
            <img
              src={item.icon}
              className={`${style.links__icon} ${
                style[`links__icon--${item.name}`]
              }`}
              alt={item.name}
              width={item.width}
              height={item.height}
            />
          </a>
        </li>
      ))}
    </ul>
    <Image
      src={avatar.url}
      width={250}
      height={250}
      alt={name + 'のプロフィール画像'}
      className={style.avatar}
    />
  </div>
)

export default function TopProfile(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
