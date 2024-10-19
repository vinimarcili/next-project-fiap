import { Address } from "@/interfaces/address.interface"
import { NextRequest, NextResponse } from "next/server"
import { authMiddleware } from "../(middlewares)/auth.middleware"

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const authResponse = await authMiddleware(request)
    if (authResponse) {
      return authResponse
    }

    const body: Address = await request.json()

    const { zipcode, street, number, neighborhood, city, state, country } = body

    // Verificar campos obrigatórios
    if (!zipcode || !street || !number || !neighborhood || !city || !state || !country) {
      return NextResponse.json({
        message: 'Todos os campos obrigatórios devem ser preenchidos.'
      }, { status: 400 })
    }

    // TODO: Salvar em algum lugar

    // Supondo que a operação foi bem-sucedida
    return NextResponse.json({
      message: 'Endereço criado/atualizado com sucesso.',
      address: body
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      message: 'Erro interno no servidor.'
    }, { status: 500 })
  }
}

