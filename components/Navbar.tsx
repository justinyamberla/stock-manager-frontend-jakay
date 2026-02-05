export default function Navbar({ onMenu, }: { onMenu?: () => void }) {
    return (
        <header className="h-14 bg-slate-900 text-slate-100 px-4 md:px-6 flex items-center justify-between shadow-md shadow-black/20">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenu}
                    className="md:hidden text-slate-300 hover:text-white"
                >
                    ☰
                </button>

                <h1 className="font-semibold text-lg tracking-wide">
                    Inventory Dashboard
                </h1>
            </div>

            <span className="text-sm text-slate-300">
        Admin
      </span>
        </header>
    )
}
