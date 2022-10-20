import { useSignal } from '@preact/signals'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  email: string
  message: string
  accessKey: string
  phone?: string // for honeypot
}

type Status = 'idle' | 'sending' | 'success' | 'error'

const { PUBLIC_STATIC_FORMS_API_ENDPOINT, PUBLIC_STATIC_FORMS_TOKEN } =
  import.meta.env

export const useContactForm = () => {
  //フォームの状態
  const status = useSignal<Status>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({ shouldUseNativeValidation: true })
  setValue('accessKey', PUBLIC_STATIC_FORMS_TOKEN)

  const inputAttributes = {
    name: register('name', { required: true }),
    email: register('email', { required: true }),
    message: register('message', { required: true }),
    honeyPot: register('phone', { required: false }),
  }

  /**
   * Static FormsにPOSTする
   */
  const onSubmit = handleSubmit((data) => {
    // 確認ダイアログ
    if (!window.confirm('メッセージを送信します。よろしいですか？')) return

    status.value = 'sending'
    const honeypotTransformed = { ...data, honeypot: data.phone } // phoneをhoneypotに変換
    delete honeypotTransformed.phone // phoneを削除

    // 改行をbrタグに変換
    const messageTransformed = {
      ...honeypotTransformed,
      message: honeypotTransformed.message.replace(/\r?\n/g, '<br />'),
    }

    const body = JSON.stringify(messageTransformed)
    const headers = { 'Content-Type': 'application/json' }

    fetch(PUBLIC_STATIC_FORMS_API_ENDPOINT, {
      method: 'POST',
      body,
      headers,
    })
      .then(() => {
        status.value = 'success'
      })
      .catch(() => {
        status.value = 'error'
      })
  })

  return {
    inputAttributes,
    errors,
    onSubmit,
    status,
  }
}
