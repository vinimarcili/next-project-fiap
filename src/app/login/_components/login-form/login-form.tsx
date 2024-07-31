'use client'

import Button from "@/components/button/button"
import Input from "@/components/input/input"
import useForm, { FormState } from "@/hooks/use-form/use-form"
import { useRouter } from "next/navigation"
import { useRef } from 'react'

const LoginForm = () => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const initialLoginForm = {
    email: '',
    password: ''
  }
  const {
    data: {
      email,
      password
    },
    loadingSubmit,
    handleChange,
    handleSubmit,
    errorsCount
  } = useForm(
    formRef,
    initialLoginForm,
    submitCallback,
    submitErrorCallback
  )

  async function submitErrorCallback(error: Error) {
    // Verificar se o erro contém causas
    if (error.cause && Object.keys(error.cause).length) {
      // Mostrar mensagem de erro para cada causa
      let message = 'Erro ao realizar login:\n\n'
      for (const key in error.cause) {
        // Adicionar causa ao texto da mensagem
        const causes = error.cause as { [key: string]: string }
        message += `- ${causes[key]}\n`
      }
      // Exibir mensagem de erro
      return window.alert(message)
    }

    // Exibir mensagem de erro quando não houver causas
    return window.alert(error.message)
  }

  async function submitCallback(values: FormState) {
    try {
      // Enviar requisição para a API
      const request = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      // Ler a resposta da API
      const response = await request.json()

      // Verificar se a resposta contém um token
      if (!response.token) {
        throw new Error(response.message)
      }

      // TODO: Guardar Token

      // Redirecionar para a página de dashboard
      router.push('/dashboard')
    } catch (error) {
      // Tratar erro
      if (error instanceof Error) {
        return submitErrorCallback(error)
      }
      return submitErrorCallback(new Error('Erro ao realizar login'))
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-2"
      onSubmit={handleSubmit}
      ref={formRef}
      noValidate
    >
      <Input
        label='E-mail'
        type='email'
        name='email'
        id='email'
        placeholder='E-mail'
        value={email}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label='Senha'
        type='password'
        name='password'
        id='password'
        placeholder='Senha'
        minLength={6}
        value={password}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Button type='submit' disabled={loadingSubmit || !!errorsCount || !formRef.current}>
        {
          loadingSubmit
            ? 'Carregando...'
            : 'Entrar'
        }
      </Button>
    </form>
  )
}

export default LoginForm