import { ChangeEvent, FormEvent, useCallback, useState } from 'react'

// Define a interface para o estado do formulário, permitindo qualquer chave com valores de qualquer tipo
export interface FormState {
  [key: string]: any
}

// Define a interface para o estado dos erros do formulário, onde cada chave é um campo e o valor é uma mensagem de erro
interface ErrorsState {
  [key: string]: string
}

// Define o tipo de função que configura erros personalizados, recebendo um evento de formulário e retornando um objeto ErrorsState
type SetCustomErrorsFunction = (target: FormEvent<HTMLFormElement>) => ErrorsState

// Define o tipo de função de callback para submissão, que recebe os valores do formulário e opcionalmente o evento do formulário, retornando uma Promise
type SubmitCallbackFunction = (values: FormState, target?: FormEvent<HTMLFormElement>) => Promise<void>

// Hook personalizado useForm para gerenciar formulários
const useForm = (
  initialState: FormState, // Estado inicial do formulário
  submitCallback: SubmitCallbackFunction, // Função de callback executada na submissão do formulário
  errorCallback?: (error: Error) => void, // Função opcional para lidar com erros
  setCustomErrors?: SetCustomErrorsFunction, // Função opcional para definir erros personalizados
) => {
  const [loading, setLoading] = useState(false) // Estado de loading do formulário, inicializado como false
  const [data, setData] = useState<FormState>(initialState) // Estado dos dados do formulário, inicializado com o estado inicial
  const [errors, setErrors] = useState<ErrorsState>({}) // Estado dos erros do formulário, inicializado como um objeto vazio
  const [errorsCount, setErrorsCount] = useState(0) // Contador de erros do formulário, inicializado como 0

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target // Extrai o nome e o valor do campo alterado
    setData({
      ...data, // Mantém os dados atuais
      [name]: value // Atualiza o valor do campo alterado
    })
  }

  // Função para validar os campos do formulário
  const validateDefault = useCallback((e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget // Obtém o formulário atual
    const formData = new FormData(form) // Cria um objeto FormData com os dados do formulário
    const isFormValid = form.checkValidity() // Verifica se o formulário é válido

    const newErrors: ErrorsState = {} // Objeto para armazenar novos erros
    if (!isFormValid) {
      for (const [name] of formData) { // Itera sobre os campos do formulário
        const element = form.elements.namedItem(name) // Obtém o elemento do campo pelo nome
        if (element instanceof HTMLInputElement) {
          newErrors[name] = element.validationMessage // Armazena a mensagem de validação do campo no objeto de erros
        }
      }
    }
    setErrors(newErrors) // Atualiza o estado dos erros com os novos erros
    return newErrors // Retorna os novos erros
  }, [])

  // Função para lidar com a submissão do formulário
  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Previne o comportamento padrão de submissão do formulário

    if (loading) { // Se já estiver carregando, não faz nada
      return
    }

    setLoading(true) // Define o estado de loading como true

    const newErrors = validateDefault(e) // Valida os campos do formulário
    const customErrors = setCustomErrors?.(e) // Obtém erros personalizados, se a função for fornecida
    const validationErrors = {
      ...newErrors, // Erros padrão
      ...customErrors // Erros personalizados
    }
    const countErrors = Object.keys(validationErrors).length // Conta o número de erros
    setErrorsCount(countErrors) // Atualiza o contador de erros

    if (countErrors) { // Se houver erros
      setLoading(false) // Define o estado de loading como false

      if (errorCallback instanceof Function) {
        errorCallback(new Error('Invalid Form', {
          cause: {
            ...validationErrors // Passa os erros para a função onError, se fornecida
          }
        }))
      }
      return // Encerra a função handleSubmit
    }

    // Chama a função de callback de submissão passando os dados do formulário
    await submitCallback(data, e)

    setLoading(false) // Define o estado de loading como false após a submissão
  }, [loading, setCustomErrors, submitCallback, validateDefault, data, errorCallback])

  // Retorna os estados e funções do hook
  return {
    data, // Dados do formulário
    errors, // Erros do formulário
    errorsCount, // Contador de erros
    loadingSubmit: loading, // Estado de loading do formulário
    handleChange, // Função para lidar com mudanças nos campos
    handleSubmit // Função para lidar com a submissão do formulário
  }
}

export default useForm // Exporta o hook personalizado useForm
