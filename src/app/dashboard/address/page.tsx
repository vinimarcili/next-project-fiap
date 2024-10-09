import AddressForm from "./_components/address-form/address-form.component"

const AddressPage = () => {
  return <>
    <div className='p-3 rounded mx-auto w-full h-full flex ' style={{ maxWidth: '500px' }}>
      <h6 className="text-2xl font-semibold text-center mb-4">Address Page</h6>
      <AddressForm />
    </div>
  </>
}

export default AddressPage