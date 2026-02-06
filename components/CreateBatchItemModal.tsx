"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import { createBatchItems } from "@/services/ItemService"

export default function CreateBatchItemModal({
                                                 onClose,
                                                 onCreated
                                             }: {
    onClose: () => void
    onCreated?: () => void
}) {

    const [rawText, setRawText] = useState("")
    const [loading, setLoading] = useState(false)

    const parsedItems = rawText
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean)
        .map((line, index) => {
            const [name, category] = line.split(",").map(v => v?.trim())

            return {
                index,
                name,
                category,
                valid: !!name && !!category
            }
        })

    const validItems = parsedItems.filter(i => i.valid)
    const invalidItems = parsedItems.filter(i => !i.valid)

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()

        if (validItems.length === 0) {
            toast.error("No hay bienes válidos")
            return
        }

        setLoading(true)

        const items = validItems.map(i => ({
            name: i.name!,
            category: i.category!
        }))

        const res = await createBatchItems(items)

        if (!res.success) {
            toast.error(res.message ?? "Error al crear lote")
            setLoading(false)
            return
        }

        toast.success(res.message ?? "Lote creado exitosamente")
        onCreated?.()
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded shadow-lg p-6 space-y-4">

                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                        Crear bienes por lote
                    </h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-900">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="text-sm">
                            Lista de bienes (Nombre, Categoría)
                        </label>

                        <textarea
                            value={rawText}
                            onChange={(e) => setRawText(e.target.value)}
                            rows={8}
                            className="w-full rounded-lg border border-slate-400 px-3 py-2 text-sm mt-1 font-mono"
                            placeholder={`Laptop HP, Electrónica\nMouse Logitech, Electrónica\nTaladro Bosch, Herramientas`}
                        />

                        <div className="text-xs text-slate-500 mt-1 flex justify-between">
                            <span>{validItems.length} válidos</span>
                            <span className={invalidItems.length ? "text-red-600" : ""}>
                                {invalidItems.length} inválidos
                            </span>
                        </div>
                    </div>

                    {invalidItems.length > 0 && (
                        <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                            ⚠️ Algunas líneas no cumplen el formato:
                            <br />
                            Formato correcto: <b>Nombre, Categoría</b>
                        </div>
                    )}

                    <div className="flex justify-end gap-2 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="bg-slate-200 px-4 py-2 rounded text-sm hover:bg-slate-300"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading || validItems.length === 0}
                            className="bg-slate-800 text-white px-4 py-2 rounded text-sm hover:bg-slate-700 disabled:opacity-60"
                        >
                            {loading ? "Creando..." : `Crear ${validItems.length} bienes`}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
