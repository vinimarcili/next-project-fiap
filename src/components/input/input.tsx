"use client"

import {
  InputHTMLAttributes,
  ReactNode,
  useMemo,
  forwardRef,
  Ref,
} from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  customError?: string | null
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ disabled, readOnly, className = "", label = "", customError = "", ...props }, ref) => {
  const errorMessage = useMemo(() => customError, [customError])
  const hasActionsState = useMemo(() => disabled || readOnly, [disabled, readOnly])
  const hasControllState = useMemo(() => hasActionsState || errorMessage, [hasActionsState, errorMessage])
  const canShowError = useMemo(() => errorMessage && !hasActionsState, [errorMessage, hasActionsState])

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.id ?? props.name ?? ""}
          className="block font-medium mb-0.5 px-0.5 text-left text-neutral-900 text-sm"
        >
          {label}
        </label>
      )}
      <input
        className={`
            w-full block p-2 border rounded 
            focus:outline-none focus:ring-1 ring-current border-neutral-900
            ${!hasControllState ? "bg-white border-neutral-900" : ""}
            ${disabled ? "bg-gray-300 border-gray-300 cursor-not-allowed" : ""} 
            ${readOnly ? "bg-gray-100 border-gray-100" : ""}
            ${canShowError ? "border-red-500 border-2 ring-red-500" : ""} 
            ${className}
          `}
        disabled={disabled}
        readOnly={readOnly}
        ref={ref}
        {...props}
      />
      <span
        className={`
            min-h-4 text-red-500 text-xs px-0.5 pt-0.5 block leading-none 
            ${canShowError ? "opacity-100 " : "opacity-0"}
          `}
      >
        {errorMessage}
      </span>
    </div>
  )
}
)
Input.displayName = "Input"
export default Input
