"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

type Item = {
    id: string
    code: string
    name: string
    description?: string
    category: string
    status: "ACTIVE" | "INACTIVE"
    createdAt: string
}

const MOCK_ITEM: Item = {
    id: "1",
    code: "A-001",
    name: "Laptop Dell XPS",
    description: "Laptop asignada a oficina administrativa",
    category: "Tecnología",
    status: "ACTIVE",
    createdAt: "2025-02-01",
}

export default function ItemDetailPage() {
    const router = useRouter()
    const params = useParams()

    const [item, setItem] = useState<Item>(MOCK_ITEM)
    const [saving, setSaving] = useState(false)

    function updateField<K extends keyof Item>(key: K, value: Item[K]) {
        setItem((prev) => ({ ...prev, [key]: value }))
    }

    function handleSave() {
        setSaving(true)

        setTimeout(() => {
            console.log("Saving item:", item)
            setSaving(false)
            alert("Cambios guardados (mock)")
        }, 800)
    }

    function toggleStatus() {
        setItem((prev) => ({
            ...prev,
            status: prev.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
        }))
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm">
                        Edita la información del bien seleccionado
                    </p>
                </div>
            </div>

            {/* Card */}
            <div className="bg-white rounded shadow-sm p-6 space-y-6">
                {/* Top info */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Código</label>
                        <input
                            value={item.code}
                            onChange={(e) => updateField("code", e.target.value)}
                            className="mt-1 w-full border border-slate-400 rounded px-3 py-2 text-sm bg-slate-100 text-slate-500"
                            disabled
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Fecha de creación</label>
                        <input
                            disabled
                            value={item.createdAt}
                            className="mt-1 w-full border border-slate-400 rounded px-3 py-2 text-sm bg-slate-100 text-slate-500"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Nombre</label>
                        <input
                            value={item.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            className="mt-1 w-full border border-slate-400 rounded px-3 py-2 text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">Descripción</label>
                    <textarea
                        value={item.description}
                        onChange={(e) => updateField("description", e.target.value)}
                        className="mt-1 w-full border border-slate-400 rounded px-3 py-2 text-sm min-h-[80px]"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Categoría</label>
                        <select
                            value={item.category}
                            onChange={(e) => updateField("category", e.target.value)}
                            className="mt-1 w-full border border-slate-400 rounded px-3 py-2 text-sm"
                        >
                            <option>Tecnología</option>
                            <option>Mobiliario</option>
                            <option>Oficina</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Estado
                            <span
                                className={`px-2 py-1 mx-2 rounded text-xs font-medium ${
                                    item.status === "ACTIVE"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {item.status === "ACTIVE" ? "Activo" : "Dado de baja"}
                            </span>
                        </label>

                        <div className="mt-2 flex items-center gap-4">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Controla si el bien está activo
                                </p>
                            </div>

                            {/* Switch */}
                            <button
                                onClick={() =>
                                    updateField(
                                        "status",
                                        item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
                                    )
                                }
                                className={`relative w-12 h-6 rounded-full transition ${
                                    item.status === "ACTIVE" ? "bg-green-500" : "bg-slate-400"
                                }`}
                            >
                                <span
                                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition transform ${
                                        item.status === "ACTIVE" ? "translate-x-6" : ""
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-slate-800 text-white px-5 py-2 rounded text-sm hover:bg-slate-700 transition"
                    >
                        {saving ? "Guardando..." : "Guardar cambios"}
                    </button>
                </div>
            </div>

            {/* History */}
            <div className="bg-white rounded shadow-sm p-6 space-y-3">
                <h2 className="font-semibold text-sm">Historial de movimientos</h2>

                <ul className="text-sm text-slate-600 space-y-2">
                    <li>📦 Creado — 2025-02-01</li>
                    <li>🔄 Actualizado — 2025-02-03</li>
                    <li>⛔ Dado de baja — 2025-02-04</li>
                </ul>
            </div>
        </div>
    )
}
