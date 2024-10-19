// Função para obter o valor de um cookie específico pelo nome.
export function getCookie(name: string) {
  const value = `; ${document.cookie}` // Obtém todos os cookies do documento e adiciona um ";" no início para facilitar a separação.
  const parts = value.split(`; ${name}=`) // Divide a string de cookies em partes, buscando a parte que contém o nome do cookie desejado.

  if (parts.length === 2) { // Se a divisão retornou exatamente duas partes, significa que o cookie existe.
    return parts.pop()?.split(';').shift() // Retorna o valor do cookie, separando-o do restante dos cookies (caso haja outros).
  }
  return undefined // Se o cookie não for encontrado, retorna undefined.
}

// Função para definir um cookie com um nome, valor e, opcionalmente, uma data de expiração em dias.
export function setCookie(name: string, value: string, days?: number) {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}` // Cria a string do cookie codificando o nome e o valor.

  if (days) { // Se um número de dias for fornecido, define a data de expiração.
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000) // Define a data de expiração, somando os dias à data atual.
    cookieString += `; expires=${date.toUTCString()}` // Adiciona a data de expiração ao cookie em formato UTC.
  }

  document.cookie = cookieString // Define o cookie no documento.
}

// Função para deletar um cookie. Para isso, define o cookie com uma data de expiração no passado.
export function deleteCookie(name: string) {
  if (getCookie(name)) { // Verifica se o cookie existe.
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT` // Define o cookie com uma data de expiração no passado, o que efetivamente o apaga.
  }
}
