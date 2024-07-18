import { ChangeEvent, FormEvent, useCallback, useState } from 'react'

export interface FormState {
  [key: string]: any
}

interface ErrorsState {
  [key: string]: string
}

type SetCustomErrorsFunction = (target: FormEvent<HTMLFormElement>) => ErrorsState

type SubmitCallbackFunction = (values: FormState, target?: FormEvent<HTMLFormElement>) => Promise<void>

const useForm = (
  initialState: FormState,
  submitCallback: SubmitCallbackFunction,
  onError?: (error: Error) => void,
  setCustomErrors?: SetCustomErrorsFunction,
) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<ErrorsState>({})
  const [errorsCount, setErrorsCount] = useState(0)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  const validateDefault = useCallback((e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget
    const formData = new FormData(form)
    const isFormValid = form.checkValidity()

    const newErrors: ErrorsState = {}
    if (!isFormValid) {
      for (const [name] of formData) {
        const element = form.elements.namedItem(name)
        if (element instanceof HTMLInputElement) {
          newErrors[name] = element.validationMessage
        }
      }
    }
    setErrors(newErrors)
    return newErrors
  }, [])

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (loading) {
      return
    }

    setLoading(true)

    const newErrors = validateDefault(e)
    const customErrors = setCustomErrors?.(e)
    const validationErrors = {
      ...newErrors,
      ...customErrors
    }
    const countErrors = Object.keys(validationErrors).length
    setErrorsCount(countErrors)

    if (countErrors) {
      setLoading(false)
      onError?.(new Error('Formulário inválido', {
        cause: {
          ...validationErrors
        }
      }))
      return
    }

    await submitCallback(data, e)

    setLoading(false)
  }, [loading, setCustomErrors, submitCallback, validateDefault, data, onError])

  return {
    data,
    errors,
    errorsCount,
    loadingSubmit: loading,
    handleChange,
    handleSubmit
  }
}

export default useForm
