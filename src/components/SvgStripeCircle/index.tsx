import type { ComponentChildren, FunctionalComponent } from 'preact'

// import style from './index.module.scss'

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
  <svg
    className={`${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1620 1620"
  >
    <defs>
      <radialGradient
        id="a"
        cx="250"
        cy="950"
        r="600"
        gradientTransform="matrix(1.35 0 0 -1.35 473 2092)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" />
        <stop offset="1" />
      </radialGradient>
    </defs>
    <path
      d="M1618 863a841 841 0 0 0 0-106l-807 53 794-158a787 787 0 0 0-28-102L811 810v-1l726-357a813 813 0 0 0-54-92L811 809l608-533a818 818 0 0 0-75-75L811 809l449-673a823 823 0 0 0-92-53L811 809h-1l260-766a809 809 0 0 0-102-27L810 809 863 2a841 841 0 0 0-106 0l53 807L652 15a787 787 0 0 0-102 28l260 766h-1L452 83a813 813 0 0 0-92 53l449 673-533-608a801 801 0 0 0-75 75l608 533-673-449a823 823 0 0 0-53 92l726 357v1L43 550a809 809 0 0 0-27 102l793 158L2 757a841 841 0 0 0 0 106l807-53L15 968a787 787 0 0 0 28 102l766-260v1L83 1168a813 813 0 0 0 53 92l673-449-608 533a818 818 0 0 0 75 75l533-608-449 673a823 823 0 0 0 92 53l357-726h1l-260 766a809 809 0 0 0 102 27l158-793-53 807a841 841 0 0 0 106 0l-53-807 158 794a787 787 0 0 0 102-28L810 811h1l357 726a813 813 0 0 0 92-54L811 811l533 608a818 818 0 0 0 75-75L811 811l673 449a823 823 0 0 0 53-92L811 811v-1l766 260a809 809 0 0 0 27-102L811 810Z"
      fill="url(#a)"
    />
  </svg>
)

export default function SvgStripeCircle(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
