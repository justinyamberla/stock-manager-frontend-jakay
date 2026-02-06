'use client'

import { useState } from 'react'

export default function CategoryDetailPage() {
    const [category, setCategory] = useState({
        id: 'cat_001',
        name: 'Electrónica',
        description: 'Dispositivos electrónicos y accesorios',
        status: 'ACTIVE',
        createdAt: '2024-02-05'
    })

    const isActive = category.status === 'ACTIVE'

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
                            onChange={(e) => (console.log('test'))}
                            className="mt-1 w-full border border-slate-400 rounded px-3 py-2 text-sm bg-slate-100 text-slate-500"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Fecha de creación:</label>
                        <input
                            value={category.createdAt}
                            onChange={(e) => (console.log('test'))}
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
                    <button className="bg-slate-800 text-white px-4 py-2 rounded text-sm hover:bg-slate-700 cursor-pointer">
                        Guardar cambios
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                <MetricCard title="Bienes activos" value="12" />
                <MetricCard title="Dados de baja" value="3" />
                <MetricCard title="Total bienes" value="15" />
            </div>
        </div>
    )
}

function MetricCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-white rounded shadow p-4">
            <p className="text-xs text-slate-500">{title}</p>
            <p className="text-2xl font-semibold">{value}</p>
        </div>
    )
}
