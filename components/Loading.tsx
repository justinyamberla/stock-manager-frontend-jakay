'use client'

export default function Loading({ show }: { show: boolean }) {
    if (!show) return null

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full shadow-lg">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span className="text-sm">Cargando...</span>
            </div>
        </div>
    )
}
