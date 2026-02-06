"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import { createCategory } from "@/services/CategoryService"

export default function CreateCategoryModal({
                                                onClose,
                                                onCreated,
                                            }: {
    onClose: () => void
    onCreated?: () => void
}) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name.trim() || !description.trim()) {
            toast.error("Todos los campos son obligatorios")
            return
        }

        setLoading(true)

        const res = await createCategory({ name, description })

        if (!res.success) {
            toast.error(res.message ?? "Error al crear categoría")
            setLoading(false)
            return
        }

        toast.success("Categoría creada correctamente")

        onCreated?.()
        onClose()
    }

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

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm">Nombre</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border border-slate-400 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-700 mt-1"
                            placeholder="Ej: Electrónica"
                        />
                    </div>

                    <div>
                        <label className="text-sm">Descripción</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-lg border border-slate-400 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-700 mt-1"
                            placeholder="Describe la categoría"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="bg-slate-200 px-4 py-2 rounded text-sm hover:bg-slate-300 cursor-pointer"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-slate-800 text-white px-4 py-2 rounded text-sm hover:bg-slate-700 cursor-pointer disabled:opacity-60"
                        >
                            {loading ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
