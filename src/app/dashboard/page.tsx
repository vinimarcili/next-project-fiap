import Link from "next/link"

const HomeDashboardPage = async () => {
  return <div className='text-center'>
    <h6 className="text-center">
      Home Dashboard Page
    </h6>
    <Link className='text-green-500 underline' href='/dashboard/address'>
      Ver endereço
    </Link>
  </div>
}

export default HomeDashboardPage