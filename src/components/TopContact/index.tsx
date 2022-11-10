import LoadingSpinner from '@/components/LoadingSpinner'
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
  const { inputAttributes, onSubmit, status } = useContactForm()
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
    status,
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
  status,
  today,
  textareaRef,
  autoChangeFieldHeight,
}: PresenterProps) => (
  <div className={`${className} ${style.contact}`}>
    <h2 className={style.title} data-watch-is-scrolled>
      CONTACT
    </h2>
    {/* TODO: resolve any */}
    <form
      disabled={status.value === 'sending' || status.value === 'success'}
      onSubmit={(e) => onSubmit(e as any)}
      className={`
      ${style.form}
      ${status.value === 'sending' ? style['form--sending'] : ''}
      ${status.value === 'error' ? style['form--error'] : ''}
      ${status.value === 'success' ? style['form--success'] : ''}
      `}
      id="contact-form"
    >
      {/* 送信中のローディング表示 */}
      {status.value === 'sending' && (
        <div className={style.sending}>
          <LoadingSpinner />
        </div>
      )}
      {/* 送信成功後の表示 */}
      {status.value === 'success' && (
        <div className={style.success}>
          <img
            src="/img/sent.png"
            className={style.sent}
            alt=""
            width="835"
            height="544"
          />
        </div>
      )}
      {/* 通常表示 */}
      <img
        src="/img/mail.png"
        alt=""
        className={style.mail}
        width="496"
        height="316"
        data-watch-is-scrolled
      />
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
    <button
      disabled={status.value === 'sending' || status.value === 'success'}
      type="submit"
      form="contact-form"
      className={style.submit}
    >
      送信
    </button>
    {/* error */}
    {status.value === 'error' && (
      <div className={style.error}>
        エラーが発生しました。時間をおいて再度お試しください。
      </div>
    )}
  </div>
)

export default function TopContact(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
