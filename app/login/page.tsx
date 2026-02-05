'use client'

import { useState } from 'react'
import {loginAdmin} from "@/services/AuthService";
import Loading from "@/components/Loading";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()

        if (!email || !password) {
            setError('Por favor, ingresa el correo y la contraseña.')
            return
        }

        console.log('Login attempt:', { email: email, password })

        try {
            setIsLoading(true)
            const res = await loginAdmin({ email, password })

            if (!res.success) {
                setError('Credenciales inválidas. Intenta de nuevo.')
                return
            }

            router.push('/admin');
        } finally {
            setIsLoading(false)
        }
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
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-slate-400 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700"
                            placeholder="admin@example.com"
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

            <Loading show={isLoading} />
        </div>
    )
}
