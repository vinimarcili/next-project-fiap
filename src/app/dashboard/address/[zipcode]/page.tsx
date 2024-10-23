import AddressForm from "../_components/address-form/address-form.component"
import Link from "next/link"

interface AddressNewPageProps {
  params: {
    zipcode: string
  }
}

const AddressNewPage = ({ params }: AddressNewPageProps) => {
  const { zipcode } = params
 
  return (
    <div className='p-3 rounded mx-auto w-full h-full flex flex-col items-center justify-center' style={{ maxWidth: '500px' }}>
      <h6 className="text-2xl font-semibold text-center mb-4">Endereço</h6>
      <AddressForm zipcodeParam={zipcode} />
    </div>
  )
}

export default AddressNewPage

