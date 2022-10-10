import { useContactForm } from '@/hooks/useContactForm'

import type { ComponentChildren, FunctionalComponent } from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  children?: ComponentChildren
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  const { inputAttributes, onSubmit } = useContactForm()

  const presenterProps = {
    inputAttributes,
    onSubmit,
  }
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  inputAttributes,
  onSubmit,
}: PresenterProps) => (
  <div className={`${className} ${style.contact}`}>
    <h2 className={style.title}>Contact</h2>
    {/* TODO: resolve any */}
    <form onSubmit={(e) => onSubmit(e as any)}>
      {/* name */}
      <label htmlFor="name">NAME:</label>
      <input type="text" {...inputAttributes.name} />
      {/* email */}
      <label htmlFor="email">E-MAIL:</label>
      <input type="email" {...inputAttributes.email} />
      {/* message */}
      <label htmlFor="message">MESSAGE HERE:</label>
      <input type="text" {...inputAttributes.message} />
      {/* honeypot */}
      <input type="phone" {...inputAttributes.honeyPot} />
      {/* submit */}
      <button type="submit">送信</button>
    </form>
  </div>
)

export default function TopContact(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
