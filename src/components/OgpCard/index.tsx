import type { ComponentChildren, FunctionalComponent } from 'preact'

type ContainerProps = {
  className?: string
  children?: ComponentChildren
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
}: PresenterProps) => (
  // inline styleしか対応していない（satori）
  <div
    className={`${className}`}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',
      width: '100%',
      height: '100%',
    }}
  >
    <span style={{ fontSize: 20 }}>{title}</span>
  </div>
)

export default function OgpCard(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
