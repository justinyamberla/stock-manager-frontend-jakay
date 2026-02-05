export default function CreateCategoryModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded shadow-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                        Crear categoría
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-900 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className="text-sm">Nombre</label>
                        <input
                            className="w-full rounded-lg border border-slate-400 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-700 mt-1"
                            placeholder="Ej: Electrónica"
                        />
                    </div>
                    <div>
                        <label className="text-sm">Descripción</label>
                        <textarea
                            className="w-full rounded-lg border border-slate-400 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-700 mt-1"
                            placeholder="Describe la categoría"
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3 py-2 text-sm border rounded hover:bg-slate-50 cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-slate-800 text-white px-4 py-2 rounded text-sm hover:bg-slate-700 cursor-pointer"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
