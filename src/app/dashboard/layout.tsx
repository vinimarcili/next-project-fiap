import { cookies } from "next/headers" // Importa a função cookies do Next.js, que permite acessar cookies no lado do servidor.
import { redirect } from "next/navigation" // Importa a função redirect, que permite redirecionar para outra rota no Next.js.
import { ReactNode } from "react" // Importa o tipo ReactNode, que representa qualquer elemento válido no React.
import ButtonLogout from "./(components)/button-logout.component" // Importa o componente ButtonLogout, responsável por lidar com a funcionalidade de logout.
import Link from "next/link"
import DashboardHeader from "./(components)/header.component"

interface DashboardLayoutProps {
  children: ReactNode // Define a propriedade "children" como um ReactNode, que representa o conteúdo passado para este componente.
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const cookieStore = cookies() // Obtém a instância de cookies, usada para acessar os cookies armazenados.
  const token = cookieStore.get('token')?.value // Tenta obter o valor do cookie 'token'. Se não houver um cookie com esse nome, 'token' será undefined.

  if (!token) { // Verifica se o token existe. Se não existir (usuário não autenticado):
    redirect('/login') // Redireciona o usuário para a página de login.
  }

  // Renderiza o layout do dashboard. Caso o token seja válido, o conteúdo é exibido normalmente.
  return <div className="flex flex-col md:flex-row h-full">
  <DashboardHeader />
  <main className="flex-1 px-4 py-2 flex items-center justify-center bg-gray-100">
    {children}
  </main>
</div>
}

export default DashboardLayout // Exporta o componente DashboardLayout para ser utilizado em outras partes da aplicação.
