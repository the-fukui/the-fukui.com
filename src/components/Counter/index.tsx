import { useComputed, useSignal } from '@preact/signals'
import type { FunctionalComponent, JSX } from 'preact'

// import style from './index.module.scss'

type ContainerProps = {
  className?: string
}

type PresenterProps = ReturnType<typeof Container> & {
  children?: JSX.Element[]
}

const Container = (props: ContainerProps) => {
  const count = useSignal(0)
  const doubled = useComputed(() => count.value * 2)

  const presenterProps = {
    count,
    doubled,
  }
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  count,
  doubled,
}: PresenterProps) => (
  <button onClick={() => count.value++} className={className}>
    {count} x 2 = {doubled}
  </button>
)

export default function Preact(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
