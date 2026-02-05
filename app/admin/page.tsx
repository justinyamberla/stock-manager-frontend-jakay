export default function DashboardPage() {
    return (
        <div className="space-y-6">

            <p className="text-sm">
                En esta sección se muestra un resumen del inventario y las actividades recientes.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Categorías" value="3" />
                <StatCard title="Bienes activos" value="124" />
                <StatCard title="Dados de baja" value="12" />
                <StatCard title="Movimientos" value="58" />
            </div>

            <div className="bg-white rounded shadow p-5">
                <h2 className="font-bold mb-3">Stock por categoría</h2>

                <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                        <span className="font-semibold text-slate-600">Electrónica</span>
                        <span>12 activos / 3 baja</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="font-semibold text-slate-600">Muebles</span>
                        <span>8 activos / 1 baja</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="font-semibold text-slate-600">Herramientas</span>
                        <span>15 activos / 0 baja</span>
                    </li>
                </ul>
            </div>

            <div className="bg-white rounded shadow p-5">
                <h2 className="font-bold mb-3">Movimientos recientes</h2>

                <ul className="space-y-2 text-sm">
                    <li>Alta individual — Electrónica</li>
                    <li>Baja por lote — Muebles</li>
                    <li>Alta por lote — Herramientas</li>
                </ul>
            </div>
        </div>
    )
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-white rounded shadow p-4">
            <p className="text-xs text-slate-500">{title}</p>
            <p className="text-2xl font-semibold">{value}</p>
        </div>
    )
}
