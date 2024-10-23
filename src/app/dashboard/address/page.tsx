'use client' // Indica que este componente é um componente de cliente, permitindo o uso de hooks e funcionalidades do React.
import { useEffect, useState } from "react" // Importa os hooks useEffect e useState do React.
import { AddressWithEmail } from '../../../interfaces/address.interface' // Importa a interface AddressWithEmail para tipagem.
import AddressCard from "./_components/address-card/address-card.component" // Importa o componente AddressCard para exibir informações de endereços.
import Link from "next/link"

const AddressPage = () => {
  const [addresses, setAddresses] = useState<AddressWithEmail[]>([]) // Estado para armazenar a lista de endereços
  const [loading, setLoading] = useState(true) // Estado para controlar o carregamento

  async function getAddressList() {
    const token = localStorage.getItem('token') ?? '' // Obtém o token de autenticação do localStorage.
    
    // Faz a requisição à API para obter todos os endereços
    const res = await fetch(`/api/address`, {
      method: 'GET', // Método HTTP da requisição
      headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo da requisição
        'Authorization': token // Adiciona o token de autenticação no cabeçalho
      }
    })
    const response =  await res.json()
    return Array.isArray(response) ? response : [] // Retorna a lista de endereços ou um array vazio se não houver endereços
  }

  // Hook useEffect para buscar a lista de endereços ao montar o componente
  useEffect(() => {
    getAddressList() // Chama a função para obter a lista de endereços
      .then((data) => setAddresses(data)) // Atualiza o estado com os endereços recebidos
      .finally(() => setLoading(false)) // Atualiza o estado de loading para false, independentemente do resultado
  }, [])

  const loader = (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )

  return (
    <div className='p-3 rounded mx-auto w-full h-full flex flex-col items-center justify-center' style={{ maxWidth: '500px' }}>
      <h6 className="text-2xl font-semibold text-center mb-4">Meus endereços</h6>
      {
        loading ? loader : ( // Verifica se está carregando
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses?.map((address, i) => ( // Mapeia os endereços e renderiza um componente AddressCard para cada um
              <AddressCard index={i} key={i} address={address} />
            ))}
          </div>
        )
      }
      {
        !loading && addresses.length === 0 && ( // Verifica se não está carregando e se não há endereços
          <p className="text-center mt-4">Nenhum endereço cadastrado.</p>
        )
      }
      <Link className='text-green-500 underline mt-3' href="/dashboard/address/new">
        Novo endereço
      </Link>
    </div>
  )
}

export default AddressPage

