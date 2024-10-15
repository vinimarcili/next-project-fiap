export function getCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift()
  }
  return undefined
}

export function setCookie(name: string, value: string, days?: number) {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    cookieString += `; expires=${date.toUTCString()}`
  }

  document.cookie = cookieString
}

export function deleteCookie(name: string) {
  if (getCookie(name)) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT`
  }
}