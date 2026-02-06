'use client'

import Link from 'next/link'
import { useEffect, useState } from "react"
import CreateCategoryModal from "@/components/CreateCategoryModal";
import { fetchCategories } from "@/services/CategoryService"
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

export default function CategoriesPage() {
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)

    const [categories, setCategories] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("ALL")

    const filtered = categories.filter((category) => {
        const matchesSearch = category.name.toLowerCase().includes(search.toLowerCase())

        const matchesStatus = statusFilter === "ALL" || category.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const loadCategories = async () => {
        setLoading(true)
        const res = await fetchCategories()

        if (!res.success) {
            toast.error(res.message ?? "Error al cargar categorías")
            setCategories([])
        } else {
            setCategories(res.data ?? [])
        }

        setLoading(false)
    }

    useEffect(() => {
        loadCategories()
    }, [])

    return (
        <div className="space-y-6">
            <p className="text-sm">
                En esta sección visualiza y gestiona las categorías de bienes del inventario.
            </p>
            <div className="flex justify-end">
                <button
                    onClick={() => setOpen(true)}
                    className="bg-slate-800 text-white px-4 py-2 rounded text-sm hover:bg-slate-700 transition flex items-center gap-2 cursor-pointer"
                >
                    ➕ Crear categoría
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nombre"
                    className="bg-slate-50 border border-slate-300 rounded px-3 py-2 text-sm w-full md:w-72"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded px-3 py-2 text-sm w-full md:w-48"
                >
                    <option value="ALL">Todos los estados</option>
                    <option value="ACTIVE">Activos</option>
                    <option value="INACTIVE">Dados de baja</option>
                </select>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(category => (
                    <Link
                        key={category.id}
                        href={`/admin/categories/${category.id}`}
                        className="bg-white rounded shadow p-5 hover:shadow-lg transition border border-slate-100"
                    >
                        <h2 className="text-lg font-semibold mb-1">
                            {category.name}
                        </h2>

                        <p className="text-sm text-slate-600 mb-3">
                            {category.description}
                        </p>

                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                            category.status === "ACTIVE"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}>
                            {category.status === "ACTIVE" ? "Activo" : "Dado de baja"}
                        </span>
                    </Link>
                ))}
            </div>

            {filtered.length === 0 && (
                <div
                    className="text-center text-slate-500 py-6"
                >
                    No hay categorías registradas
                </div>
            )}

            {open && (
                <CreateCategoryModal
                    onClose={() => setOpen(false)}
                    onCreated={() => {loadCategories()}}
                />
            )}

            <Loading show={loading} />
        </div>
    )
}
