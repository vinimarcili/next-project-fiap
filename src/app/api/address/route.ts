import { Address, AddressDocument } from "@/interfaces/address.interface"
import { NextRequest, NextResponse } from "next/server"
import addressList from './(data)/address.json'
import { GenericRepository } from "@/repositories/generic.repository"
const addressCollection = new GenericRepository<AddressDocument>('address')

// Função assíncrona que trata requisições GET.
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const email = request.headers.get('x-user-email')

    // getQuery params
    const url = request.nextUrl
    const queryParams = url.searchParams
    const zipcode = queryParams.get('zipcode')


    // // Filtra a lista de endereços para encontrar apenas aqueles que correspondem ao email do usuário.
    // const userAddresses = addressList.filter((address) => {
    //   if (zipcode) {
    //     return address.email === email && address.zipcode === zipcode
    //   }
    //   return address.email === email
    // }) ?? []

    const userAddresses = addressCollection.findAll({ email: email })

    // Retorna a lista de endereços do usuário no formato JSON com status 200.
    return NextResponse.json(userAddresses, { status: 200 })
  } catch (error) {
    console.error(error)
    // Em caso de erro, retorna uma mensagem de erro genérica com status 500.
    return NextResponse.json({
      message: 'Erro interno no servidor.'
    }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const email = request.headers.get('x-user-email')

    const body: Address = await request.json()

    const { zipcode, street, number, neighborhood, city, state, country } = body

    // Verificar campos obrigatórios
    if (!zipcode || !street || !number || !neighborhood || !city || !state || !country) {
      return NextResponse.json({
        message: 'Todos os campos obrigatórios devem ser preenchidos.'
      }, { status: 400 })
    }

    // Alterar JSON
    const addressIndex = addressList.findIndex((address) => address.zipcode === zipcode && address.email === email)

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
    console.error(error)
    return NextResponse.json({
      message: 'Erro interno no servidor.'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const email = request.headers.get('x-user-email')

    const url = request.nextUrl
    const queryParams = url.searchParams
    const zipcode = queryParams.get('zipcode')

    if (!zipcode) {
      return NextResponse.json({
        message: 'O CEP é obrigatório.'
      }, { status: 400 })
    }

    const foundedAddress = addressList.findIndex((address) => address.zipcode === zipcode && address.email === email)

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
    console.error(error)
    return NextResponse.json({
      message: 'Erro interno no servidor.'
    }, { status: 500 })
  }
}
