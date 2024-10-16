'use client' // Indica que este código deve ser executado no lado do cliente. Isso é usado no Next.js para diferenciar o código que será processado no cliente.

import Button from "@/components/button/button" // Importa o componente 'Button', que será utilizado para renderizar um botão de logout.
import { deleteCookie } from "@/utils/cookie/cookie" // Importa a função 'deleteCookie', usada para apagar o cookie de autenticação (token).
import { useRouter } from "next/navigation" // Importa o hook 'useRouter' do Next.js, que permite navegação programática entre as páginas.

const ButtonLogout = () => { 
  const router = useRouter() // Usa o hook 'useRouter' para obter uma instância do roteador do Next.js, permitindo navegação entre as rotas.

  const logout = () => { 
    deleteCookie('token') // Apaga o cookie 'token', que é o cookie de autenticação, efetivamente desconectando o usuário.
    router.push('/login') // Redireciona o usuário para a página de login após o logout.
  }

  return (
    <Button handleClick={() => logout()}> {/* Renderiza o componente 'Button', passando a função 'logout' para ser chamada ao clicar no botão. */}
      Logout {/* Texto exibido dentro do botão. */}
    </Button>
  )
}

export default ButtonLogout // Exporta o componente 'ButtonLogout' para ser usado em outras partes da aplicação.
