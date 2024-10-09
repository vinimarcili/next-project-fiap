export type ViaCepResponse = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export async function getZipcode(zipcode: string): Promise<ViaCepResponse | null> {
  const sanitized = zipcode.replace(/\D/g, '')

  if (sanitized.length !== 8) {
    throw new Error("CEP inválido. Deve conter 8 dígitos numéricos.")
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${sanitized}/json/`)

    if (!response.ok) {
      throw new Error(`Erro ao buscar CEP: ${response.statusText}`)
    }

    const data: ViaCepResponse = await response.json()

    if ('erro' in data) {
      throw new Error("CEP não encontrado.")
    }

    return data
  } catch (error) {
    throw error
  }
}