import { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <div className="flex flex-col gap-1 justify-center content-center h-full">
    <header className="text-center px-2">
      <h1 className="text-xl">
        Dashboard
      </h1>
    </header>
    <main className="px-2">
      {children}
    </main>
  </div>
}

export default DashboardLayout