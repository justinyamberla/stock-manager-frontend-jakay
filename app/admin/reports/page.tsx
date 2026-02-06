"use client"

import { useEffect, useState } from "react"
import Loading from "@/components/Loading"
import { getCategoryReport } from "@/services/ReportService"

type CategoryReport = {
    category: string
    active: number
    inactive: number
}

export default function ReportsPage() {
    const [data, setData] = useState<CategoryReport[]>([])
    const [loading, setLoading] = useState(true)

    async function loadReports() {
        setLoading(true)
        const res = await getCategoryReport()

        if (res.success) {
            setData(res.data)
        } else {
            setData([])
        }

        setLoading(false)
    }

    useEffect(() => {
        loadReports()
    }, [])

    const totalActive = data.reduce((sum, c) => sum + c.active, 0)
    const totalInactive = data.reduce((sum, c) => sum + c.inactive, 0)

    return (
        <div className="space-y-6">
            <p className="text-sm">
                Reporte de bienes por categoría (activos vs dados de baja)
            </p>

            {/* Metrics summary */}
            <div className="grid md:grid-cols-3 gap-4">
                <MetricCard title="Categorías" value={data.length} />
                <MetricCard title="Bienes activos" value={totalActive} />
                <MetricCard title="Dados de baja" value={totalInactive} />
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                    <tr>
                        <th className="text-left px-4 py-3">Categoría</th>
                        <th className="text-left px-4 py-3">Disponibles</th>
                        <th className="text-left px-4 py-3">Dados de baja</th>
                        <th className="text-left px-4 py-3">Total</th>
                    </tr>
                    </thead>

                    <tbody>
                    {data.map((row, index) => {
                        const total = row.active + row.inactive

                        return (
                            <tr
                                key={index}
                                className="border-t border-slate-300 hover:bg-slate-50 transition"
                            >
                                <td className="px-4 py-3 font-medium">
                                    {row.category}
                                </td>

                                <td className="px-4 py-3 text-green-700 font-semibold">
                                    {row.active}
                                </td>

                                <td className="px-4 py-3 text-red-700 font-semibold">
                                    {row.inactive}
                                </td>

                                <td className="px-4 py-3 font-semibold">
                                    {total}
                                </td>
                            </tr>
                        )
                    })}

                    {data.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center text-slate-500 py-6">
                                No hay datos disponibles
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

function MetricCard({ title, value }: { title: string; value: number }) {
    return (
        <div className="bg-white rounded shadow p-4">
            <p className="text-xs text-slate-500">{title}</p>
            <p className="text-2xl font-semibold">{value}</p>
        </div>
    )
}
