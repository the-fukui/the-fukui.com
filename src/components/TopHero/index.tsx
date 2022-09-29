import SvgPc from '@/components/SvgPc'
import SvgStripeCircle from '@/components/SvgStripeCircle'

import type { ComponentChildren, FunctionalComponent } from 'preact'

import style from './index.module.scss'

const HERO_TEXT = `Webエンジニアのふくいと申します。
知っておいて損はしない。
多分しないと思う。
しないんじゃないかな。
ま、ちょっと覚悟はしておけ。`
type ContainerProps = {
  className?: string
  children?: ComponentChildren
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
}: PresenterProps) => (
  <section className={`${className} ${style.hero}`}>
    <span className={style.text} id="js-heroText">
      {HERO_TEXT}
    </span>
    <div className={style.image}>
      <SvgPc className={style.pc} />
      <SvgStripeCircle className={style.stripe} />
    </div>
  </section>
)

export default function TopHero(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
