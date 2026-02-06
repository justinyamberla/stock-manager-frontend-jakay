'use client'

import Link from 'next/link'
import {useState} from "react";
import CreateCategoryModal from "@/components/CreateCategoryModal";

const mockCategories = [
    {
        id: '1',
        name: 'Electrónica',
        description: 'Dispositivos electrónicos y accesorios',
        status: 'ACTIVE',
        itemsCount: 12
    },
    {
        id: '2',
        name: 'Muebles',
        description: 'Mobiliario de oficina y hogar',
        status: 'INACTIVE',
        itemsCount: 8
    },
    {
        id: '3',
        name: 'Herramientas',
        description: 'Herramientas manuales y eléctricas',
        status: 'ACTIVE',
        itemsCount: 15
    }
]

export default function CategoriesPage() {
    const [open, setOpen] = useState(false)

    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("ALL")

    const filtered = mockCategories.filter((asset) => {
        const matchesSearch =
            asset.name.toLowerCase().includes(search.toLowerCase())

        const matchesStatus =
            statusFilter === "ALL" || asset.status === statusFilter

        return matchesSearch && matchesStatus
    })


    return (
        <div className="space-y-6">
            <p className="text-sm">
                En esta sección se gestionan las categorías de bienes del inventario.
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
                    placeholder="Buscar por nombre o código..."
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

                        <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">
                            {category.itemsCount} bienes
                        </span>

                        <span className={`text-xs px-2 py-1 rounded text-slate-600 mx-2 ${
                            category.status === "ACTIVE"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}>
                            {category.status}
                        </span>
                    </Link>
                ))}
            </div>

            {filtered.length === 0 && (
                <div
                    className="text-center text-slate-500 py-6"
                >
                    No hay bienes registrados
                </div>
            )}

            {open && <CreateCategoryModal onClose={() => setOpen(false)} />}
        </div>
    )
}
