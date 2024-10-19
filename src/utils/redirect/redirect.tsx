'use server'
import { permanentRedirect, redirect } from 'next/navigation'

interface RedirectProps {
  path: string
  permanent?: boolean
}

const Redirect = (props: RedirectProps) => {
  if (props) {
    const { path, permanent } = props
    if (permanent) {
      return permanentRedirect(path)
    }
    return redirect(path)
  }
  return null
}

export default Redirect