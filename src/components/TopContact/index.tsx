import { useContactForm } from '@/hooks/useContactForm'

import dayjs from 'dayjs'
import { createRef } from 'preact'
import type { ComponentChildren, FunctionalComponent } from 'preact'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  children?: ComponentChildren
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  const { inputAttributes, onSubmit } = useContactForm()
  const today = dayjs().format('MMM D ,YYYY')
  const textareaRef = createRef<HTMLTextAreaElement>()

  // textareaが5行を超えたら自動でエリア拡張する
  const autoChangeFieldHeight = () => {
    const target = textareaRef.current
    if (!target) return

    // 一旦1行にして、最低でどれぐらいスクロール必要かを計測して反映
    target.style.height = '40px'

    // 5行を超えたら=スクロールに入ったら自動で大きくする
    if (target.scrollHeight > 200) {
      target.style.height = target.scrollHeight + 'px'
    } else {
      target.style.height = '200px'
    }
  }

  const presenterProps = {
    inputAttributes,
    onSubmit,
    today,
    textareaRef,
    autoChangeFieldHeight,
  }
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  inputAttributes,
  onSubmit,
  today,
  textareaRef,
  autoChangeFieldHeight,
}: PresenterProps) => (
  <div className={`${className} ${style.contact}`}>
    <h2 className={style.title}>CONTACT</h2>
    {/* TODO: resolve any */}
    <form
      onSubmit={(e) => onSubmit(e as any)}
      className={style.form}
      id="contact-form"
    >
      <span className={style.description}>
        ご連絡は下記フォームよりお気軽にどうぞ
      </span>
      <div className={style.date}>
        <span className={style.date__label}>DATE</span>
        <span className={style.date__input}>{today}</span>
      </div>
      {/* name */}
      <label htmlFor="name" className={style.required}>
        NAME
      </label>
      <input type="text" {...inputAttributes.name} />
      {/* email */}
      <label htmlFor="email" className={style.required}>
        E-MAIL
      </label>
      <input type="email" {...inputAttributes.email} />
      <hr />
      {/* message */}
      <label htmlFor="message" className={style.required}>
        MESSAGE HERE:
      </label>
      <textarea
        type="text"
        {...inputAttributes.message}
        ref={(e) => {
          inputAttributes.message.ref(e)
          textareaRef.current = e
        }}
        onChange={autoChangeFieldHeight}
      />

      {/* honeypot */}
      <input type="phone" {...inputAttributes.honeyPot} />
    </form>
    {/* submit */}
    <button type="submit" form="contact-form">
      送信
    </button>
  </div>
)

export default function TopContact(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
