import type { ComponentChildren, FunctionalComponent } from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  children?: ComponentChildren
  skills: {
    type?: string
    skill?: string
  }[]
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  /** Logic here */
  const { skills } = props

  const mergedSkill = (() => {
    // スキルを一覧で返す
    let allSkill: string[] = []
    skills.forEach((type) => {
      if (type.type !== 'GCP' && type.skill) {
        // GCPは別途表示
        allSkill = allSkill.concat(type.skill.split(','))
      }
    })
    return allSkill
  })()
  const GCPSkill = (() => {
    const GCP = skills.find((type) => {
      return type.type === 'GCP'
    })
    return GCP?.skill?.split(',') || []
  })()

  const presenterProps = {
    mergedSkill,
    GCPSkill,
  }
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  mergedSkill,
  GCPSkill,
}: PresenterProps) => (
  <div className={`${className} ${style.skills}`}>
    <div className={style.title}>
      <h3 className={`${style.title__text} ${style['title__text--main']}`}>
        SKILL
      </h3>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          style={{
            opacity: 1 / (i + 2),
            transform: `translateY(${-1 * (i + 1)}em) rotate(-15deg)`,
          }}
          className={`${style.title__text} ${style['skill__text--gradient']}`}
        >
          SKILL
        </span>
      ))}
    </div>
    <ul className={style.list}>
      {mergedSkill.map((skill) => (
        <li key={skill} className={style.list__item}>
          {skill}
        </li>
      ))}

      <li
        className={`${style.list__item} ${style['list__item--GCP']} ${style.GCP}`}
      >
        <h4 className={style.GCP__title}>GCP</h4>
        <ul className={style.GCP__list}>
          {GCPSkill.map((skill) => (
            <li key={skill} className={style.GCP__item}>
              {skill}
            </li>
          ))}
        </ul>
      </li>
    </ul>
    <div className={`${style.ex} ${style.intersected}`}>
      <span className={style.ex__text}>
        ...and playing <span className={style.ex__item}>guitar</span> and
        <span className={style.ex__item}>violin</span>! 😎
      </span>

      <img
        src="/img/guitar.svg"
        className={`${style.ex__img} ${style['ex__img--guitar']}`}
        alt=""
        width="459"
        height="1390"
      />

      <img
        src="/img/violin.svg"
        className={`${style.ex__img} ${style['ex__img--violin']}`}
        alt=""
        width="196"
        height="532"
      />
    </div>
  </div>
)

export default function TopSkills(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
