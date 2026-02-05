'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Categorías', path: '/admin/categories' },
    { label: 'Bienes', path: '/admin/items' },
    { label: 'Reportes', path: '/admin/reports' },
    { label: 'Historial de movimientos', path: '/admin/history' },
]

export default function Sidebar() {
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === '/admin') return pathname === '/admin'
        return pathname.startsWith(path)
    }

    return (
        <aside className="hidden md:block w-64 bg-slate-300 text-slate-900 shadow-md shadow-black/20">
            <div className="p-6 font-bold text-lg tracking-wide">
                GESTION DE INVENTARIO
            </div>

            <nav className="px-3 space-y-1">
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
        </aside>
    )
}
