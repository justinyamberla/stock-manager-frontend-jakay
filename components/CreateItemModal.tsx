"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import {createItem} from "@/services/ItemService";

export default function CreateItemModal({ onClose, onCreated }: { onClose: () => void, onCreated?: () => void }) {

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()

        if (!name.trim() || !category.trim()) {
            toast.error("Todos los campos son obligatorios")
            return
        }

        setLoading(true)

        const res = await createItem({ name, category: category })

        if (!res.success) {
            toast.error(res.message ?? "Error al crear bien")
            setLoading(false)
            return
        }

        toast.success("Bien creado correctamente")

        onCreated?.()
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded shadow-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                        Crear bien
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
                            placeholder="Ej: Laptop HP"
                        />
                    </div>

                    <div>
                        <label className="text-sm">Categoría</label>
                        <input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-lg border border-slate-400 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-700 mt-1"
                            placeholder="Ej: Electrónica"
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
