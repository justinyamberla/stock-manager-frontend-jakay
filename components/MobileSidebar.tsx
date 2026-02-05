import Link from 'next/link'

const navItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: 'Items', href: '/items' },
    { label: 'Reports', href: '/reports' },
]

export default function MobileSidebar({ open, setOpen,}: { open: boolean, setOpen: (value: boolean) => void }) {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
            <aside className="w-64 h-full bg-slate-800 text-slate-100 p-6">
                <button
                    onClick={() => setOpen(false)}
                    className="mb-6 text-slate-400 hover:text-white"
                >
                    Close ✕
                </button>

                <nav className="space-y-1">
                    {navItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="block rounded px-3 py-2 hover:bg-slate-700 transition"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>
        </div>
    )
}
