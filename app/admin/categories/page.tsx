'use client'

import Link from 'next/link'
import {useState} from "react";
import CreateCategoryModal from "@/components/CreateCategoryModal";

const mockCategories = [
    {
        id: '1',
        name: 'Electrónica',
        description: 'Dispositivos electrónicos y accesorios',
        itemsCount: 12
    },
    {
        id: '2',
        name: 'Muebles',
        description: 'Mobiliario de oficina y hogar',
        itemsCount: 8
    },
    {
        id: '3',
        name: 'Herramientas',
        description: 'Herramientas manuales y eléctricas',
        itemsCount: 15
    }
]

export default function CategoriesPage() {
    const [open, setOpen] = useState(false)

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

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockCategories.map(category => (
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
                    </Link>
                ))}
            </div>

            {open && <CreateCategoryModal onClose={() => setOpen(false)} />}
        </div>
    )
}
