"use client" // Declaração para uso do cliente

import { InputHTMLAttributes, ChangeEvent, useCallback, ReactNode, useState } from "react"

// Definição das propriedades aceitas pelo componente Input, estendendo as propriedades padrão de um input HTML
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  handleChange?: (value: string, e?: ChangeEvent<HTMLInputElement>) => void // Função opcional para lidar com mudanças no input
  label?: ReactNode // Conteúdo opcional para rótulo do input
}

// Componente funcional Input que renderiza um input HTML personalizado
const Input = ({ handleChange, disabled, className = '', label = '', ...props }: InputProps) => {
  const [error, setError] = useState<string | null>(null) // Estado para controlar mensagens de erro

  // Callback para lidar com mudanças no input
  const onHandleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { validity, validationMessage, value } = e.target

    // Verifica a validade do input e atualiza o estado de erro conforme necessário
    setError(!validity.valid ? validationMessage : null)

    // Chama a função handleChange passada como prop, se existir
    if (handleChange instanceof Function) {
      handleChange(value, e)
    }
  }, [handleChange]) // Dependência do callback de mudança

  return (
    <>
      {label && (
        <label
          htmlFor={props.id ?? props.name ?? ''}
          className={`block font-medium mb-0.5 px-0.5`}
        >
          {label}
        </label>
      )}
      <input
        {...props} // Passa todas as outras propriedades para o input HTML
        onChange={onHandleChange} // Atribui o callback de mudança ao evento onChange
        className={`block p-2 border rounded ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'} ${className}`} // Classes CSS condicionais baseadas em propriedades
        disabled={disabled} // Define se o input está desabilitado ou não
      />
      <span className={`text-red-500 text-sm py-1 px-0.5 ${error ? 'block' : 'none'}`}>{error}</span> {/* Exibe a mensagem de erro se houver */}
    </>
  )
}

export default Input // Exporta o componente Input como padrão
