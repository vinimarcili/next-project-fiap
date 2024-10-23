import { Address, AddressDocument } from "@/interfaces/address.interface"
import { NextRequest, NextResponse } from "next/server"
import addressList from './(data)/address.json'
import { GenericRepository } from "@/repositories/generic.repository"

const addressCollection = new GenericRepository<AddressDocument>('address')

// Função assíncrona que trata requisições GET.
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const email = request.headers.get('x-user-email') ?? ''

    // getQuery params
    const url = request.nextUrl
    const queryParams = url.searchParams
    const zipcode = queryParams.get('zipcode')

    const userAddresses = await addressCollection.findAll({
      email: email,
      ...(zipcode && { zipcode: zipcode })
    })

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
    const email = request.headers.get('x-user-email') ?? ''

    const body: Address = await request.json()

    const { zipcode, street, number, neighborhood, city, state, country } = body

    // Verificar campos obrigatórios
    if (!zipcode || !street || !number || !neighborhood || !city || !state || !country) {
      return NextResponse.json({
        message: 'Todos os campos obrigatórios devem ser preenchidos.'
      }, { status: 400 })
    }

    await addressCollection.upsert(
      {
        email,
        zipcode
      }, {
        ...body,
        email
      } as AddressDocument)

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
    const email = request.headers.get('x-user-email') ?? ''

    const url = request.nextUrl
    const queryParams = url.searchParams
    const zipcode = queryParams.get('zipcode')

    if (!zipcode) {
      return NextResponse.json({
        message: 'O CEP é obrigatório.'
      }, { status: 400 })
    }

    const foundedAddress = await addressCollection.findOne({
      email: email,
      zipcode: zipcode
    })

    if (!foundedAddress) {
      return NextResponse.json({
        message: 'Endereço não encontrado.'
      }, { status: 404 })
    }

    await addressCollection.delete({
      _id: foundedAddress._id
    })

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
