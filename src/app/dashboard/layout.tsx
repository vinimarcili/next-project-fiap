import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react"
import ButtonLogout from "./(components)/button-logout.component";

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/login')
  }

  return <div className="flex flex-col gap-1 justify-center content-center h-full">
    <header className="text-center px-2">
      <h1 className="text-xl">
        Dashboard
      </h1>
    </header>
    <main className="px-2">
      {children}
    </main>
    <footer className="text-center px-2">
      <ButtonLogout />
    </footer>
  </div>
}

export default DashboardLayout