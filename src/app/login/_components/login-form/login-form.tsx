'use client'

import Button from "@/components/button/button"
import Input from "@/components/input/input"
import useForm, { FormState } from "@/hooks/use-form/use-form"

const LoginForm = () => {
  const initialLoginForm = {
    email: '',
    password: ''
  }
  const {
    data: {
      email,
      password
    },
    loading,
    handleChange,
    handleSubmit
  } = useForm(
    initialLoginForm,
    submitCallback
  )

  async function submitCallback(values: FormState) {
    console.log(values)

    // TODO: Envie os dados do formulário para a API

    // DO fake request to take 5s
    await new Promise((resolve) => setTimeout(resolve, 5000))
  }

  return (
    <form
      className="w-full flex flex-col gap-2"
      onSubmit={handleSubmit}
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
        readOnly={loading}
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
        readOnly={loading}
        required
      />
      <Button type='submit' disabled={loading}>
        Entrar
      </Button>
    </form>
  )
}

export default LoginForm