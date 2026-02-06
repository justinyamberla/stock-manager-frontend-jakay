'use client'

import {useEffect, useState} from 'react'
import { useParams } from 'next/navigation'
import {getCategoryById, updateCategory} from "@/services/CategoryService";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import {Category} from "@/types/domain";

export default function CategoryDetailPage() {
    const params = useParams<{ id: string }>()

    const [loading, setLoading] = useState(true)

    const [category, setCategory] = useState<Category>({
        id: '',
        name: '',
        description: '',
        status: 'INACTIVE',
        createdAt: ''
    })

    const isActive = category.status === 'ACTIVE'

    const loadCategory = async () => {
        setLoading(true)
        const res = await getCategoryById(params.id)

        if (!res.success) {
            toast.error(res.message ?? "Error al cargar categoría")
            setCategory({
                id: '',
                name: '',
                description: '',
                status: 'INACTIVE',
                createdAt: ''
            })
        } else {
            setCategory(res.data ?? [])
        }

        setLoading(false)
    }

    const saveChanges = async () => {
        setLoading(true)
        const res = await updateCategory(params.id, category)
        if (!res.success) {
            toast.error(res.message ?? "Error al actualizar categoría")
        } else {
            toast.success("Categoría actualizada correctamente")
            setCategory(res.data ?? category)
        }
        setLoading(false)
    }

    useEffect(() => {
        loadCategory()
    }, [])

    return (
        <div className="space-y-6">
            <div>
                <p className="text-sm">
                    Gestiona la información de esta categoría
                </p>
            </div>

            <div className="bg-white rounded shadow p-6 space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">ID</label>
                        <input
                            value={category.id}
                            className="mt-1 w-full border border-slate-400 rounded px-3 py-2 text-sm bg-slate-100 text-slate-500"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Fecha de creación:</label>
                        <input
                            value={category.createdAt}
                            className="mt-1 w-full border border-slate-400 rounded px-3 py-2 text-sm bg-slate-100 text-slate-500"
                            disabled
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">Nombre</label>
                    <input
                        value={category.name}
                        onChange={(e) =>
                            setCategory({ ...category, name: e.target.value })
                        }
                        className="w-full border rounded border-slate-400 px-3 py-2 text-sm mt-1"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Descripción</label>
                    <textarea
                        value={category.description}
                        onChange={(e) =>
                            setCategory({ ...category, description: e.target.value })
                        }
                        className="w-full border rounded border-slate-400 px-3 py-2 text-sm mt-1"
                    />
                </div>

                <div>
                    <div>
                        <label className="text-sm font-medium">Estado
                            <span
                                className={`px-2 py-1 mx-2 rounded text-xs font-medium ${
                                    category.status === "ACTIVE"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {category.status === "ACTIVE" ? "Activo" : "Dado de baja"}
                            </span>
                        </label>
                    </div>

                    <div className="mt-2 flex items-center gap-4">
                        <div>
                            <p className="text-sm text-slate-500">
                                Controla si la categoría está activa
                            </p>
                        </div>
                        <button
                            onClick={() =>
                                setCategory({
                                    ...category,
                                    status: isActive ? 'INACTIVE' : 'ACTIVE'
                                })
                            }
                            className={`relative w-12 h-6 rounded-full transition ${isActive ? 'bg-green-600' : 'bg-slate-400'}`}
                        >
                        <span
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${isActive ? 'translate-x-6' : ''}`}
                        />
                        </button>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        className="bg-slate-800 text-white px-4 py-2 rounded text-sm hover:bg-slate-700 cursor-pointer"
                        onClick={saveChanges}
                    >
                        Guardar cambios
                    </button>
                </div>
            </div>

            <Loading show={loading} />
        </div>
    )
}
