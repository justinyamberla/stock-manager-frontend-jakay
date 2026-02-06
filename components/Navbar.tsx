'use client'

import { usePathname } from 'next/navigation'

export default function Navbar({ onMenu }: { onMenu?: () => void }) {
    const pathname = usePathname()

    const titleMap: Record<string, string> = {
        '/admin/categories': 'Categorías',
        '/admin/items': 'Bienes',
        '/admin/reports': 'Reportes',
        '/admin/history': 'Historial de movimientos',
    }

    const getTitle = () => {
        if (titleMap[pathname]) return titleMap[pathname]

        // fallback para rutas dinámicas futuras
        if (pathname.startsWith('/admin/categories')) return 'Categorías'
        if (pathname.startsWith('/admin/items')) return 'Bienes'

        return 'Panel de Administración'
    }

    return (
        <header className="h-14 bg-slate-800 text-slate-100 px-4 md:px-6 flex items-center justify-between shadow-md shadow-black/20">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenu}
                    className="md:hidden text-slate-300 hover:text-white"
                >
                    ☰
                </button>

                <h1 className="font-semibold text-lg tracking-wide">
                    {getTitle()}
                </h1>
            </div>

            <span className="text-sm text-slate-300">
                Admin
            </span>
        </header>
    )
}
