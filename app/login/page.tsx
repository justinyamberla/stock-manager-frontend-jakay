'use client'

import { useState } from 'react'

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()

        // Temporal: luego conectamos JWT
        if (!username || !password) {
            setError('Por favor, ingresa el usuario y la contraseña.')
            return
        }

        console.log('Login attempt:', { username, password })
        setError(null)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-semibold text-slate-800 text-center">
                    Login de Admin
                </h1>

                <p className="text-sm text-slate-500 text-center mt-2">
                    Accede al panel de control de inventario
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm text-slate-600 mb-1">
                            Usuario
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full rounded-lg border border-slate-400 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700"
                            placeholder="admin"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-600 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-slate-400 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white rounded-lg py-2 hover:bg-slate-800 transition font-medium"
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    )
}
