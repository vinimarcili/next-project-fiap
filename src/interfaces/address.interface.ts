export interface Address {
  zipcode: string
  street: string
  number: string
  complement?: string | null
  neighborhood: string
  city: string
  state: string
  country: string
}