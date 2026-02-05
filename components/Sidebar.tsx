import Link from 'next/link'

const navItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: 'Items', href: '/items' },
    { label: 'Reports', href: '/reports' },
]

export default function Sidebar() {
    return (
        <aside className="hidden md:block w-64 bg-slate-800 text-slate-100">
            <div className="p-6 font-bold text-lg tracking-wide">
                Inventory App
            </div>

            <nav className="px-3 space-y-1">
                {navItems.map(item => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded px-3 py-2 text-sm hover:bg-slate-700 transition"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}