"use client"

import Link from "next/link"
import {useEffect, useState} from "react"
import toast from "react-hot-toast";
import {deactivateItemsBatch, fetchItems} from "@/services/ItemService";
import Loading from "@/components/Loading";
import CreateItemModal from "@/components/CreateItemModal";
import CreateBatchItemModal from "@/components/CreateBatchItemModal";

export default function ItemsPage() {
    const [loading, setLoading] = useState(true)
    const [openCreateItemModal, setOpenCreateItemModal] = useState(false)
    const [openCreateBatchItemModal, setOpenCreateBatchItemModal] = useState(false)

    const [items, setItems] = useState<any[]>([])
    const [selectedIds, setSelectedIds] = useState<string[]>([])

    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("ALL")

    const filtered = items.filter((category) => {
        const matchesSearch = category.name.toLowerCase().includes(search.toLowerCase())

        const matchesStatus = statusFilter === "ALL" || category.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(itemId => itemId !== id)
                : [...prev, id]
        )
    }

    const toggleSelectAll = () => {
        if (selectedIds.length === items.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(items.map(item => item.id))
        }
    }

    const loadItems = async () => {
        setLoading(true)
        const res = await fetchItems()

        if (!res.success) {
            toast.error(res.message ?? "Error al cargar bienes")
            setItems([])
        } else {
            setItems(res.data ?? [])
        }

        setLoading(false)
    }

    async function handleBatchDeactivate() {
        if (selectedIds.length === 0) {
            toast.error("No hay bienes seleccionados")
            return
        }

        const confirmed = confirm(`¿Dar de baja ${selectedIds.length} bienes?`)
        if (!confirmed) return

        const res = await deactivateItemsBatch(selectedIds)

        if (!res.success) {
            toast.error(res.message ?? "Error al dar de baja lote")
            return
        }

        toast.success(res.message ?? "Bienes dados de baja")
        loadItems();
        setSelectedIds([])
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
                        onClick={() => setOpenCreateItemModal(true)}
                        className="bg-slate-800 text-white px-4 py-2 rounded text-sm hover:bg-slate-700 transition cursor-pointer"
                    >
                        ➕ Crear bien
                    </button>

                    <button
                        onClick={() => setOpenCreateBatchItemModal(true)}
                        className="bg-slate-700 text-white px-4 py-2 rounded text-sm hover:bg-slate-600 transition cursor-pointer"
                    >
                        📦 Carga masiva
                    </button>

                    <button
                        onClick={handleBatchDeactivate}
                        className="bg-red-600 text-white px-4 py-2 rounded text-sm transition hover:bg-red-700 cursor-pointer"
                    >
                        Dar de baja ({selectedIds.length})
                    </button>
                </div>
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

            <div className="overflow-x-auto bg-white rounded shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                    <tr>
                        <th className="text-left px-4 py-3">
                            <input
                                type="checkbox"
                                checked={items.length > 0 && selectedIds.length === items.length}
                                onChange={toggleSelectAll}
                            />
                        </th>
                        <th className="text-left px-4 py-3">Código</th>
                        <th className="text-left px-4 py-3">Nombre</th>
                        <th className="text-left px-4 py-3">Categoría</th>
                        <th className="text-left px-4 py-3">Estado</th>
                        <th className="text-left px-4 py-3">Fecha creación</th>
                        <th className="text-right px-4 py-3">Acciones</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filtered.map((item) => (
                        <tr
                            key={item.id}
                            className="border-t border-slate-300 hover:bg-slate-50 transition"
                        >
                            <td className="px-4 py-3">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(item.id)}
                                    onChange={() => toggleSelect(item.id)}
                                />
                            </td>
                            <td className="px-4 py-3 font-mono">{item.id}</td>
                            <td className="px-4 py-3">{item.name}</td>
                            <td className="px-4 py-3 text-slate-600">
                                {item.category}
                            </td>

                            <td className="px-4 py-3">
                                <span
                                    className={`px-2 py-1 rounded text-xs font-medium ${
                                        item.status === "ACTIVE"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {item.status === "ACTIVE" ? "Activo" : "Dado de baja"}
                                </span>
                            </td>

                            <td className="px-4 py-3 text-slate-500">
                                {item.createdAt}
                            </td>

                            <td className="px-4 py-3 text-right space-x-2">
                                <Link
                                    href={`/admin/items/${item.id}`}
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

            {openCreateItemModal && (
                <CreateItemModal
                    onClose={() => setOpenCreateItemModal(false)}
                    onCreated={() => loadItems()}
                />
            )}

            {openCreateBatchItemModal && (
                <CreateBatchItemModal
                    onClose={() => setOpenCreateBatchItemModal(false)}
                    onCreated={() => loadItems()}
                />
            )}

            <Loading show={loading} />
        </div>
    )
}
