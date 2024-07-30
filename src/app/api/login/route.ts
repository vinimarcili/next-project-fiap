
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
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
    }

    // TODO: Replace this with a real authentication logic
    if (email === 'vinipetter@gmail.com' && password === '123456') {
      return NextResponse.json({ token: 'fake-token' })
    }

    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}