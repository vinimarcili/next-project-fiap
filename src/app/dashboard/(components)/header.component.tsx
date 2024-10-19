"use client"

import { useState } from "react"
import Link from "next/link"
import ButtonLogout from "./button-logout.component"

const DashboardHeader = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  const menu = [
    { name: "Meus Dados", path: "/dashboard/profile" },
    { name: "Meus Endereços", path: "/dashboard/address" },
    { name: "Meus Pedidos", path: "/dashboard/orders" }
  ]

  return (
    <div className="h-full bg-black text-white">
      <header className="sticky top-0 flex items-center justify-between px-4 py-2">
        <h1 className="text-xl">
          <Link href="/dashboard">Dashboard</Link>
        </h1>
        <button onClick={toggleMenu} className="md:hidden text-white">
          {/* Ícone do menu hamburger */}
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </header>

      {/* Menu Lateral */}
      <nav className={`md:flex md:flex-col md:w-64 ${isMenuOpen ? 'block' : 'hidden'} md:block md:h-[calc(100%-44px)]`}>
        <div className="flex flex-col items-center md:items-start md:h-full md:py-3">
          {menu.map((item) => (
            <Link key={item.path} href={item.path} className="px-4 py-2 text-center md:text-left border-b border-gray-700 hover:bg-gray-700 w-full">
              {item.name}
            </Link>
          ))}
          <div className="px-4 py-2 md:mt-auto text-center w-full">
            <ButtonLogout /> {/* Componente de botão de logout */}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default DashboardHeader
