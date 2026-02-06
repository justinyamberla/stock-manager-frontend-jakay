"use client"

import {useEffect, useState} from "react"
import {getMovements} from "@/services/MovementService"
import Loading from "@/components/Loading"

export default function MovementsPage() {
    const [movements, setMovements] = useState([])
    const [typeFilter, setTypeFilter] = useState("ALL")
    const [loading, setLoading] = useState(true)

    const loadMovements = async () => {
        setLoading(true)
        const res = await getMovements()
        if (res.success) setMovements(res.data)
        setLoading(false)
    }

    useEffect(() => {
        loadMovements()
    }, [])

    const filtered = movements.filter((m: any) => {
        return typeFilter === "ALL" || m.type === typeFilter
    })

    return (
        <div className="space-y-6">
            <p className="text-sm">
                Visualiza el historial de movimientos del inventario
            </p>

            <div className="flex flex-col md:flex-row gap-3">

                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded px-3 py-2 text-sm w-full md:w-48"
                >
                    <option value="ALL">Todos los tipos</option>
                    <option value="ADD">Altas</option>
                    <option value="DEACTIVATE">Bajas</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                    <tr>
                        <th className="text-left px-4 py-3">Movimiento</th>
                        <th className="text-left px-4 py-3">Modo</th>
                        <th className="text-left px-4 py-3">Cantidad</th>
                        <th className="text-left px-4 py-3">Items afectados</th>
                        <th className="text-left px-4 py-3">Fecha</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filtered.map((m: any) => (
                        <tr
                            key={m.id}
                            className="border-t border-slate-300 hover:bg-slate-50 transition"
                        >
                            {/* Type */}
                            <td className="px-4 py-3">
                                <span
                                    className={`px-2 py-1 rounded text-xs font-medium ${
                                        m.type === "ADD"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {m.type === "ADD" ? "Alta" : "Baja"}
                                </span>
                            </td>

                            {/* Mode */}
                            <td className="px-4 py-3 text-slate-600">
                                {m.mode === "BATCH" ? "Lote" : "Individual"}
                            </td>

                            {/* Count */}
                            <td className="px-4 py-3 font-medium">
                                {m.targetIds.length}
                            </td>

                            {/* Target IDs */}
                            <td className="px-4 py-3 text-xs font-mono text-slate-500">
                                {m.targetIds.slice(0, 4).join(", ")}
                                {m.targetIds.length > 4 && " ..."}
                            </td>

                            {/* Timestamp */}
                            <td className="px-4 py-3 text-slate-500">
                                {m.timestamp}
                            </td>
                        </tr>
                    ))}

                    {filtered.length === 0 && (
                        <tr>
                            <td
                                colSpan={5}
                                className="text-center text-slate-500 py-6"
                            >
                                No hay movimientos registrados
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <Loading show={loading} />
        </div>
    )
}
