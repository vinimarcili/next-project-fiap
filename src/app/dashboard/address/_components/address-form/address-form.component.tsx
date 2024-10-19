"use client"

import { getZipcode } from "@/clients/viacep.client"
import Button from "@/components/button/button"
import Input from "@/components/input/input"
import useForm, { FormState } from "@/hooks/use-form/use-form"
import { Address } from "@/interfaces/address.interface"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

interface AddressFormProps {
  zipcodeParam: string
}

const AddressForm = ({ zipcodeParam }: AddressFormProps) => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(zipcodeParam !== 'new')
  const initialLoginForm: Address = {
    zipcode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
  }
  const {
    data: {
      zipcode,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
    },
    loadingSubmit,
    handleChange,
    handleSubmit,
    errorsCount,
  } = useForm(formRef, initialLoginForm, submitCallback, submitErrorCallback)

  async function getAddress(zipcode: string) {
    if (!zipcode) {
      return
    }

    const token = localStorage.getItem('token') ?? '' // Obtém o token de autenticação do localStorage.
    
    // Faz a requisição à API para obter todos os endereços
    const res = await fetch(`/api/address?zipcode=${zipcode}`, {
      method: 'GET', // Método HTTP da requisição
      headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo da requisição
        'Authorization': token // Adiciona o token de autenticação no cabeçalho
      }
    })

    return await res.json() // Retorna a resposta JSON da requisição
  }

  useEffect(() => {
    if (zipcodeParam && zipcodeParam !== 'new') {
      setLoading(true)
      getAddress(zipcodeParam)
      .then((data) => {
        if (data && data?.length) {
          const address = data[0] as Address
          Object.entries(address).forEach(([name, value]) => {
            handleChange({
              target: { name, value },
            } as React.ChangeEvent<HTMLInputElement>)
          })
        }
      })
      .finally(() => setLoading(false))
    }
  }, [zipcodeParam, handleChange])

  async function submitErrorCallback(error: Error) {
    // Verificar se o erro contém causas
    if (error.cause && Object.keys(error.cause).length) {
      // Mostrar mensagem de erro para cada causa
      let message = "Erro ao salvar endereço :\n\n"
      for (const key in error.cause) {
        // Adicionar causa ao texto da mensagem
        const causes = error.cause as { [key: string]: string }
        message += `- ${causes[key]}\n`
      }
      // Exibir mensagem de erro
      return window.alert(message)
    }

    // Exibir mensagem de erro quando não houver causas
    return window.alert(error.message)
  }

  async function submitCallback(values: FormState) {
    try {
      // Enviar requisição para a API
      const request = await fetch("/api/address", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") ?? "",
        },
        body: JSON.stringify(values),
      })
      // Ler a resposta da API
      const response = await request.json()

      // Verificar se a resposta contém um token
      if (!response.token) {
        throw new Error(response.message)
      }

      window.alert("Endereço salvo com sucesso!")
    } catch (error) {
      // Tratar erro
      if (error instanceof Error) {
        return submitErrorCallback(error)
      }
      return submitErrorCallback(new Error("Erro ao salvar endereço"))
    }
  }

  const onZipCodeChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        handleChange(e)

        const response = await getZipcode(e.target.value)

        if (!response) {
          return
        }

        const addressFields = {
          street: response.logradouro,
          complement: response.complemento,
          neighborhood: response.bairro,
          city: response.localidade,
          state: response.uf,
          country: "Brasil",
        }
        
        Object.entries(addressFields).forEach(([name, value]) => {
          handleChange({
            target: { name, value },
          } as React.ChangeEvent<HTMLInputElement>)
        })

        formRef.current?.number.focus()
      } catch (error) {
        console.error(error)
      }
    },
    [handleChange, formRef]
  )

  const deleteAddress = useCallback(async () => {
    const confirm = window.confirm("Deseja realmente excluir este endereço?")
    if (!zipcode || !confirm || loading) {
      return
    }
    try {
      setLoading(true)
      // Enviar requisição para a API
      const request = await fetch(`/api/address?zipcode=${zipcode}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") ?? "",
        },
      })
      // Ler a resposta da API
      const response = await request.json()

      // Verificar se a resposta contém um token
      if (!response.ok) {
        throw new Error(response.message)
      }

      window.alert("Endereço excluído com sucesso!")
      router.push('/dashboard/address')
    } catch (error) {
      // Tratar erro
      if (error instanceof Error) {
        return submitErrorCallback(error)
      }
      return submitErrorCallback(new Error("Erro ao excluir endereço"))
    } finally {
      setLoading(false)
    }
  }, [zipcode, loading, router])

  return (
    <form
      className="w-full flex flex-col gap-2"
      onSubmit={handleSubmit}
      ref={formRef}
      noValidate
    >
      <Input
        label="CEP"
        type="text"
        name="zipcode"
        id="zipcode"
        placeholder="xxxxx-xxx"
        value={zipcode}
        handleChange={(_, e) => onZipCodeChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label="Rua"
        type="text"
        name="street"
        id="street"
        placeholder="Rua"
        value={street}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label="Número"
        type="text"
        name="number"
        id="number"
        placeholder="Número"
        value={number}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label="Complemento"
        type="text"
        name="complement"
        id="complement"
        placeholder="Complemento"
        value={complement}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
      />
      <Input
        label="Bairro"
        type="text"
        name="neighborhood"
        id="neighborhood"
        placeholder="Bairro"
        value={neighborhood}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label="Cidade"
        type="text"
        name="city"
        id="city"
        placeholder="Cidade"
        value={city}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label="Estado"
        type="text"
        name="state"
        id="state"
        placeholder="Estado"
        value={state}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label="País"
        type="text"
        name="country"
        id="country"
        placeholder="País"
        value={country}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Button
        type="submit"
        disabled={loadingSubmit || !!errorsCount || !formRef.current || loading}
      >
        {loadingSubmit || loading ? "Carregando..." : "Salvar"}
      </Button>
      {
        zipcodeParam !== 'new' && (
          <Button
            type="button"
            handleClick={deleteAddress}
            disabled={loadingSubmit || !formRef.current || loading}
            className="bg-red-500 hover:bg-red-600"
          >
            {loading ? "Carregando..." : "Excluir"}
          </Button>
        )
      }
    </form>
  )
}

export default AddressForm
