"use client"

import Link from "next/link"
import { useState } from "react"

type Asset = {
    id: string
    name: string
    categoryId: string
    status: "ACTIVE" | "INACTIVE"
    createdAt: string
}

const MOCK_ASSETS: Asset[] = [
    {
        id: "1",
        name: "Laptop Dell XPS",
        categoryId: "Tecnología",
        status: "ACTIVE",
        createdAt: "2025-02-01",
    },
    {
        id: "2",
        name: "Silla ergonómica",
        categoryId: "Mobiliario",
        status: "INACTIVE",
        createdAt: "2025-01-28",
    },
    {
        id: "3",
        name: "Monitor Samsung",
        categoryId: "Tecnología",
        status: "ACTIVE",
        createdAt: "2025-02-03",
    },
]

export default function ItemsPage() {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("ALL")

    const filtered = MOCK_ASSETS.filter((asset) => {
        const matchesSearch =
            asset.name.toLowerCase().includes(search.toLowerCase())

        const matchesStatus =
            statusFilter === "ALL" || asset.status === statusFilter

        return matchesSearch && matchesStatus
    })

    return (
        <div className="space-y-6">
            <p className="text-sm">
                Visualiza y gestiona los bienes existentes del inventario
            </p>
            {/* Header */}
            <div className="flex justify-end">
                <div className="flex gap-2">
                    <button className="bg-slate-800 text-white px-4 py-2 rounded text-sm hover:bg-slate-700 transition cursor-pointer">
                        ➕ Crear bien
                    </button>

                    <button className="bg-slate-700 text-white px-4 py-2 rounded text-sm hover:bg-slate-600 transition cursor-pointer">
                        📦 Carga masiva
                    </button>
                </div>
            </div>

            {/* Filters */}
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

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                    <tr>
                        <th className="text-left px-4 py-3">Código</th>
                        <th className="text-left px-4 py-3">Nombre</th>
                        <th className="text-left px-4 py-3">Categoría</th>
                        <th className="text-left px-4 py-3">Estado</th>
                        <th className="text-left px-4 py-3">Fecha</th>
                        <th className="text-right px-4 py-3">Acciones</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filtered.map((asset) => (
                        <tr
                            key={asset.id}
                            className="border-t border-slate-300 hover:bg-slate-50 transition"
                        >
                            <td className="px-4 py-3 font-mono">{asset.id}</td>
                            <td className="px-4 py-3">{asset.name}</td>
                            <td className="px-4 py-3 text-slate-600">
                                {asset.categoryId}
                            </td>

                            <td className="px-4 py-3">
                                <span
                                    className={`px-2 py-1 rounded text-xs font-medium ${
                                        asset.status === "ACTIVE"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {asset.status === "ACTIVE" ? "Activo" : "Dado de baja"}
                                </span>
                            </td>

                            <td className="px-4 py-3 text-slate-500">
                                {asset.createdAt}
                            </td>

                            <td className="px-4 py-3 text-right space-x-2">
                                <Link
                                    href={`/admin/items/${asset.id}`}
                                    className="text-slate-600 hover:text-black text-sm mx-2"
                                >
                                    ✏️ Ver y editar
                                </Link>

                                {asset.status === "ACTIVE" && (
                                    <button className="text-red-600 hover:text-red-700 text-sm mx-2 cursor-pointer">
                                        ⛔ Baja
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}

                    {filtered.length === 0 && (
                        <tr>
                            <td
                                colSpan={6}
                                className="text-center text-slate-500 py-6"
                            >
                                No hay bienes registrados
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
