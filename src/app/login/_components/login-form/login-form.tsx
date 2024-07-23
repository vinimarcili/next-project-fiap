'use client'

import Button from "@/components/button/button"
import Input from "@/components/input/input"
import { useForm, SubmitHandler, Controller, FieldErrors } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRef, useState, useEffect, useMemo } from 'react'
import * as yup from "yup"

type LoginFormData = {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória'),
  })
  .required()

const LoginForm = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, formState } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema),
    mode: "onChange"
  })
  const { errors, isValid } = useMemo(() => formState, [formState])

  async function submitErrorCallback() {
    // TODO: Tratar erros
  }

  async function submitCallback(values: LoginFormData) {
    setLoading(true)

    // Verifica se o formulário é válido
    // TODO: Outros erros?
    if (!isValid) {
      await submitErrorCallback()
      setLoading(false)
      return
    }

    // TODO: Envie os dados do formulário para a API
    console.log(values)

    // DO fake request to take 5s
    await new Promise((resolve) => setTimeout(resolve, 5000))
    setLoading(false)
  }

  return (
    <form
      className="w-full flex flex-col gap-2"
      onSubmit={handleSubmit(submitCallback)}
      ref={formRef}
      noValidate
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            label='E-mail'
            type='email'
            id='email'
            placeholder='E-mail'
            readOnly={loading}
            customError={errors?.email?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            label='Senha'
            type='password'
            id='password'
            placeholder='Senha'
            minLength={6}
            readOnly={loading}
            customError={errors?.password?.message}
            {...field}
          />
        )}
      />
      <Button type='submit' disabled={!formRef.current || loading || !isValid}>
        {
          loading
            ? 'Carregando...'
            : 'Entrar'
        }
      </Button>
    </form>
  )
}

export default LoginForm
