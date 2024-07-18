import { ChangeEvent, FormEvent, useState } from 'react'

interface InitialState {
  [key: string]: any
}

type ValidateFunction = (target: FormEvent<HTMLFormElement>) => InitialState

const useForm = (initialState: InitialState, validate: ValidateFunction) => {
  const [values, setValues] = useState<InitialState>(initialState)
  const [errors, setErrors] = useState<InitialState>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validate(e)

    // verify every field in the form event



    setErrors(validationErrors)
    if (!Object.keys(validationErrors).length) {
      throw new Error('Formulário inválido', validationErrors)
    }
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit
  }
}

export default useForm
