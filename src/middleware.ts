import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (!authHeader) {
    return NextResponse.json({
      message: 'Header de autorização ausente.'
    }, { status: 401 })
  }

  const token = authHeader // Aqui o token é diretamente o e-mail.

  // Você pode adicionar uma lógica simples de validação, se necessário.
  if (!isValidEmail(token)) {
    return NextResponse.json({
      message: 'Token de autorização inválido.'
    }, { status: 403 })
  }

  const response = NextResponse.next()

  response.headers.set('x-user-email', token)

  return response
}

// Função simples para validar o formato do e-mail
function isValidEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const config = {
  matcher: ['/api/address/:path*']
}

