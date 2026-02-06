'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const navItems = [
    { label: 'Categorías', path: '/admin/categories' },
    { label: 'Bienes', path: '/admin/items' },
    { label: 'Reportes', path: '/admin/reports' },
    { label: 'Historial de movimientos', path: '/admin/history' },
]

export default function Sidebar() {
    const pathname = usePathname()
    const { logout } = useAuth()

    const isActive = (path: string) => {
        if (path === '/admin') return pathname === '/admin'
        return pathname.startsWith(path)
    }

    return (
        <aside className="hidden md:flex w-64 bg-slate-300 text-slate-900 shadow-md shadow-black/20 flex-col">
            <div className="p-6 font-bold text-lg tracking-wide">
                GESTION DE INVENTARIO
            </div>

            <nav className="px-3 space-y-1 flex-1">
                {navItems.map(item => {
                    const active = isActive(item.path)

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`
                                block rounded px-3 py-2 text-sm transition
                                ${active
                                ? 'bg-slate-800 text-white font-semibold'
                                : 'hover:bg-slate-200'
                            }
                            `}
                        >
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-200">
                <button
                    onClick={logout}
                    className="w-full text-left text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded text-sm font-semibold transition cursor-pointer"
                >
                    Cerrar sesión
                </button>
            </div>

        </aside>
    )
}
