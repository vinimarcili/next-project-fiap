
import { NextRequest, NextResponse } from "next/server"

// Interface de resposta da rota
type LoginResponse = {
  token?: string
  message?: string
}

// Interface do corpo da requisição
interface LoginBody {
  email: string
  password: string
}

// Função que será executada quando a rota for chamada atravéz do método POST
export async function POST(request: NextRequest): Promise<NextResponse<LoginResponse>> {
  try {
    // Lê o corpo da requisição
    const body: LoginBody = await request.json()
    const { email, password } = body

    // Verifica se o email e senha foram informados
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
    }

    // TODO: Implementar a lógica de autenticação
    if (email === 'email@teste.com' && password === '123456') {
      return NextResponse.json({ token: 'fake-token' })
    }

    // Retorna erro de autenticação
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
  } catch (error) {
    console.error(error)
    // Retorna erro interno do servidor
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

