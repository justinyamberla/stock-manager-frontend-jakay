'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type AuthContextType = {
    isAuthenticated: boolean
    login: () => void
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Ping opcional para verificar sesión si quieres
        setIsLoading(false)
    }, [])

    const login = () => {
        setIsAuthenticated(true)
        router.push('/')
    }

    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        setIsAuthenticated(false)
        router.push('/login')
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, login, logout, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be inside AuthProvider')
    return ctx
}
