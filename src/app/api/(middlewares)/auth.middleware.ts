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

  // Se válido, você pode armazenar o e-mail para uso posterior
  request.user = { email: token }

  return NextResponse.next()
}

// Função simples para validar o formato do e-mail (opcional)
function isValidEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const authMiddleware = middleware