import { NextRequest, NextResponse } from "next/server"

type LoginResponse = {
  token?: string
  message?: string
}

interface LoginBody {
  email: string
  password: string
}

export async function POST(request: NextRequest): Promise<NextResponse<LoginResponse>> {
  try {
    const body: LoginBody = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({
        message: 'E-mail e senha são obrigatórios.'
      }, { status: 400 })
    }

    // TODO: Implementar lógica de autenticação
    if (email === 'email@teste.com' && password === '123456') {
      return NextResponse.json({ token: 'token' })
    }

    return NextResponse.json({
      message: 'E-mail ou senha inválidos.'
    }, { status: 401 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({
      message: 'Internal Server Error'
    }, { status: 500 })
  }
}
