'use client'

import Button from "@/components/button/button"
import Input from "@/components/input/input"

const LoginForm = () => {
  return (
    <form className="w-full flex flex-col gap-2">
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
        required
      />
      <Button type='submit'>
        Entrar
      </Button>
    </form>
  )
}

export default LoginForm