import Link from "next/link"
import LoginForm from "./_components/login-form/login-form"

const LoginPage = () => {
  return <div className='p-3 bg-white rounded shadow mx-auto w-full' style={{ maxWidth: '300px' }}>
    <h2 className="text-center mb-2">
      Login
    </h2>
    <LoginForm />
    <footer className="text-center mt-4">
      Não tem uma conta?<br />
      <Link className="text-green-500 underline" href="/login/register">Cadastre-se</Link>
    </footer>
  </div>
}

export default LoginPage