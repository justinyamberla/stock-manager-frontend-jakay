"use client"

import {useEffect, useState} from "react"
import { useParams } from "next/navigation"
import {Item} from "@/types/domain"
import toast from "react-hot-toast"
import Loading from "@/components/Loading"
import {getItemById, updateItem} from "@/services/ItemService"

export default function ItemDetailPage() {
    const params = useParams<{ id: string }>()
    const [loading, setLoading] = useState(true)

    const [item, setItem] = useState<Item>({
        id: '',
        name: '',
        category: '',
        status: "INACTIVE",
        createdAt: ''
    })

    const isActive = item.status === 'ACTIVE'

    const loadItem = async () => {
        setLoading(true)

        const res = await getItemById(params.id)

        if (!res.success) {
            toast.error(res.message ?? "Error al cargar bien")
            setItem({
                id: '',
                name: '',
                category: '',
                status: 'INACTIVE',
                createdAt: ''
            })
        } else {
            setItem(res.data ?? item)
        }

        setLoading(false)
    }

    const saveChanges = async () => {
        setLoading(true)

        const res = await updateItem(params.id, item)

        if (!res.success) {
            toast.error(res.message ?? "Error al actualizar bien")
        } else {
            toast.success("Bien actualizado correctamente")
            setItem(res.data ?? item)
        }

        setLoading(false)
    }

    useEffect(() => {
        loadItem()
    }, [])

    return (
        <div className="space-y-6">
            <div>
                <p className="text-sm">
                    Edita la información del bien seleccionado
                </p>
            </div>

            <div className="bg-white rounded shadow-sm p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Código</label>
                        <input
                            value={item.id}
                            disabled
                            className="mt-1 w-full border border-slate-400 rounded px-3 py-2 text-sm bg-slate-100 text-slate-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Fecha de creación</label>
                        <input
                            value={item.createdAt}
                            disabled
                            className="mt-1 w-full border border-slate-400 rounded px-3 py-2 text-sm bg-slate-100 text-slate-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">Nombre</label>
                    <input
                        value={item.name}
                        onChange={(e) =>
                            setItem({ ...item, name: e.target.value })
                        }
                        className="mt-1 w-full border border-slate-400 rounded px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Categoría</label>
                    <input
                        value={item.category}
                        onChange={(e) =>
                            setItem({ ...item, category: e.target.value })
                        }
                        className="mt-1 w-full border border-slate-400 rounded px-3 py-2 text-sm"
                        placeholder="Ej: Tecnología"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">
                        Estado
                        <span
                            className={`px-2 py-1 mx-2 rounded text-xs font-medium ${
                                isActive
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {isActive ? "Activo" : "Dado de baja"}
                        </span>
                    </label>

                    <div className="mt-2 flex items-center gap-4">
                        <p className="text-sm text-slate-500">
                            Controla si el bien está activo
                        </p>

                        <button
                            onClick={() =>
                                setItem({
                                    ...item,
                                    status: isActive ? 'INACTIVE' : 'ACTIVE'
                                })
                            }
                            className={`relative w-12 h-6 rounded-full transition ${
                                isActive ? "bg-green-500" : "bg-slate-400"
                            }`}
                        >
                            <span
                                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition transform ${
                                    isActive ? "translate-x-6" : ""
                                }`}
                            />
                        </button>
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        onClick={saveChanges}
                        disabled={loading}
                        className="bg-slate-800 text-white px-5 py-2 rounded text-sm hover:bg-slate-700 transition"
                    >
                        {loading ? "Guardando..." : "Guardar cambios"}
                    </button>
                </div>
            </div>

            <Loading show={loading} />
        </div>
    )
}
