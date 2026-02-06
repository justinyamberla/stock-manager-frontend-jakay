"use client"

import Link from "next/link"
import {useEffect, useState} from "react"
import toast from "react-hot-toast";
import {fetchItem} from "@/services/ItemService";
import Loading from "@/components/Loading";
import CreateItemModal from "@/components/CreateItemModal";

export default function ItemsPage() {
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)

    const [items, setItems] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("ALL")

    const filtered = items.filter((category) => {
        const matchesSearch = category.name.toLowerCase().includes(search.toLowerCase())

        const matchesStatus = statusFilter === "ALL" || category.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const loadItems = async () => {
        setLoading(true)
        const res = await fetchItem()

        if (!res.success) {
            toast.error(res.message ?? "Error al cargar bienes")
            setItems([])
        } else {
            setItems(res.data ?? [])
        }

        setLoading(false)
    }

    useEffect(() => {
        loadItems()
    }, [])

    return (
        <div className="space-y-6">
            <p className="text-sm">
                Visualiza y gestiona los bienes existentes del inventario
            </p>

            <div className="flex justify-end">
                <div className="flex gap-2">
                    <button
                        onClick={() => setOpen(true)}
                        className="bg-slate-800 text-white px-4 py-2 rounded text-sm hover:bg-slate-700 transition cursor-pointer"
                    >
                        ➕ Crear bien
                    </button>

                    <button
                        className="bg-slate-700 text-white px-4 py-2 rounded text-sm hover:bg-slate-600 transition cursor-pointer"
                    >
                        📦 Carga masiva
                    </button>
                </div>
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

            <div className="overflow-x-auto bg-white rounded shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                    <tr>
                        <th className="text-left px-4 py-3">Código</th>
                        <th className="text-left px-4 py-3">Nombre</th>
                        <th className="text-left px-4 py-3">Categoría</th>
                        <th className="text-left px-4 py-3">Estado</th>
                        <th className="text-left px-4 py-3">Fecha creación</th>
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
                                {asset.category}
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

            {open && (
                <CreateItemModal
                    onClose={() => setOpen(false)}
                    onCreated={() => {loadItems()}}
                />
            )}

            <Loading show={loading} />
        </div>
    )
}
