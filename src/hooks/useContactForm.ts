import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  email: string
  message: string
  accessKey: string
  phone?: string // for honeypot
}

const { PUBLIC_STATIC_FORMS_API_ENDPOINT, PUBLIC_STATIC_FORMS_TOKEN } =
  import.meta.env

export const useContactForm = () => {
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
    const honeypotTransformed = { ...data, honeypot: data.phone } // phoneをhoneypotに変換
    delete honeypotTransformed.phone // phoneを削除

    const body = JSON.stringify(honeypotTransformed)
    const headers = { 'Content-Type': 'application/json' }
    return fetch(PUBLIC_STATIC_FORMS_API_ENDPOINT, {
      method: 'POST',
      body,
      headers,
    })
  })

  return {
    inputAttributes,
    errors,
    onSubmit,
  }
}
