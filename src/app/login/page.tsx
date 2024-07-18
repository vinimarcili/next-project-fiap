import LoginForm from "./_components/login-form/login-form"

const LoginPage = () => {
  return <div className='p-3 bg-white rounded shadow mx-auto w-max'>
    <h2 className="text-center mb-2">
      Login
    </h2>
    <LoginForm />
  </div>
}

export default LoginPage