'use client'

import Button from "@/components/button/button"
import { deleteCookie } from "@/utils/cookie/cookie"
import { useRouter } from "next/navigation"

const ButtonLogout = () => {
  const router = useRouter()

  const logout = () => {
    deleteCookie('token')
    router.push('/login')
  }

  return (
    <Button handleClick={() => logout()}>
      Logout
    </Button>
  )
}

export default ButtonLogout