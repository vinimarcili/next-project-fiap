'use client'

import Button from "@/components/button/button"
import Input from "@/components/input/input"
import useForm from "@/hooks/use-form/use-form"
import { FormEvent, useState } from "react"

const LoginForm = () => {
  // const [loginForm, setLoginForm] = useState({
  //   email: '',
  //   password: ''
  // })
  // const {} = useForm(loginForm)

  const validate = (e: FormEvent<HTMLFormElement>) => {

  }

  return (
    <form className="w-full flex flex-col gap-2" noValidate>
      <Input
        label='E-mail'
        type='email'
        name='email'
        id='email'
        placeholder='E-mail'
        required
      />
      <Input
        label='Senha'
        type='password'
        name='password'
        id='password'
        placeholder='Senha'
        minLength={6}
        required
      />
      <Button type='submit'>
        Entrar
      </Button>
    </form>
  )
}

export default LoginForm