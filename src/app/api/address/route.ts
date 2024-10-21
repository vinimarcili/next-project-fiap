import { Address } from "@/interfaces/address.interface"
import { NextRequest, NextResponse } from "next/server"
import { authMiddleware } from "../(middlewares)/auth.middleware"
import addressList from './(data)/address.json'

// Função assíncrona que trata requisições GET.
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Chama o middleware de autenticação passando a requisição.
    const authResponse = await authMiddleware(request)

    // Se a autenticação falhar, retorna a resposta do middleware.
    if (authResponse) {
      return authResponse
    }

    // Desestrutura o objeto 'user' da requisição, que contém as informações do usuário autenticado.
    const { user } = request

    // Extrai o email do usuário. O tipo do usuário é especificado para garantir que o email esteja presente.
    const { email } = user

    // getQuery params
    const url = request.nextUrl
    const queryParams = url.searchParams
    const zipcode = queryParams.get('zipcode')

    // Filtra a lista de endereços para encontrar apenas aqueles que correspondem ao email do usuário.
    const userAddresses = addressList.filter((address) => {
      if (zipcode) {
        return address.email === email && address.zipcode === zipcode
      }
      return address.email === email
    }) ?? []

    // Retorna a lista de endereços do usuário no formato JSON com status 200.
    return NextResponse.json(userAddresses, { status: 200 })
  } catch (error) {
    // Em caso de erro, retorna uma mensagem de erro genérica com status 500.
    return NextResponse.json({
      message: 'Erro interno no servidor.'
    }, { status: 500 })
  }
}

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

    // Alterar JSON
    const addressIndex = addressList.findIndex((address) => address.zipcode === zipcode && address.email === request.user.email)

    if (addressIndex >= 0) {
      addressList[addressIndex] = { ...addressList[addressIndex], ...body }
    }

    if (addressIndex === -1) {
      addressList.push({ ...body, email: request.user.email })
    }

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

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const authResponse = await authMiddleware(request)
    if (authResponse) {
      return authResponse
    }

    const url = request.nextUrl
    const queryParams = url.searchParams
    const zipcode = queryParams.get('zipcode')

    if (!zipcode) {
      return NextResponse.json({
        message: 'O CEP é obrigatório.'
      }, { status: 400 })
    }

    const foundedAddress = addressList.findIndex((address) => address.zipcode === zipcode && address.email === request.user.email)

    if (foundedAddress < 0) {
      return NextResponse.json({
        message: 'Endereço não encontrado.'
      }, { status: 404 })
    }

    addressList.splice(foundedAddress, 1)

    return NextResponse.json({
      ok: true,
      message: 'Endereço deletado com sucesso.'
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      message: 'Erro interno no servidor.'
    }, { status: 500 })
  }
}
