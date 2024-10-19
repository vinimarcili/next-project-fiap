import { AddressWithEmail } from '@/interfaces/address.interface'
import Link from 'next/link'

interface AddressCardProps {
  address: AddressWithEmail
  index: number
}

const AddressCard = ({ address, index }: AddressCardProps) => {
  return (
    <Link href={`/address/${address.zipcode}`} className='h-full'>
      <div className="p-4 border border-gray-300 rounded bg-branch transition hover:bg-opacity-75 cursor-pointer bg-white">
        <h6 className="font-semibold">Endereço {index + 1}</h6>
        <p>{address.street}, {address.number}</p>
        <p>{address.city}, {address.state}</p>
        <p>{address.zipcode}</p>
      </div>
    </Link>
  )
}

export default AddressCard