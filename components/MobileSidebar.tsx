'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const navItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Categorías', path: '/admin/categories' },
    { label: 'Bienes', path: '/admin/items' },
    { label: 'Reportes', path: '/admin/reports' },
    { label: 'Historial de movimientos', path: '/admin/history' },
]

export default function MobileSidebar({open, setOpen}: { open: boolean, setOpen: (value: boolean) => void }) {
    const pathname = usePathname()

    useEffect(() => {
        setOpen(false)
    }, [pathname, setOpen])

    if (!open) return null

    const isActive = (path: string) => {
        if (path === '/admin') return pathname === '/admin'
        return pathname.startsWith(path)
    }

    return (
        <div className="fixed inset-0 z-50 md:hidden bg-black/40">
            <aside className="w-64 h-full bg-slate-300 text-slate-900 shadow-md shadow-black/20 p-6">

                <button
                    onClick={() => setOpen(false)}
                    className="mb-6 text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                    Cerrar ✕
                </button>

                <nav className="space-y-1">
                    {navItems.map(item => {
                        const active = isActive(item.path)

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`
                                    block rounded px-3 py-2 text-sm transition
                                    ${active
                                    ? 'bg-slate-900 text-white font-semibold'
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
        </div>
    )
}
