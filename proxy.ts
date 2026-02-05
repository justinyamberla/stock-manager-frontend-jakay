import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/jwt'

export function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const path = request.nextUrl.pathname

    const isLoginPage = path.startsWith('/login')
    const isAdminPage = path.startsWith('/admin')

    let hasValidToken = false

    if (token) {
        try {
            verifyToken(token)
            hasValidToken = true
        } catch {
            hasValidToken = false
        }
    }

    if (path === '/') {
        return NextResponse.redirect(
            new URL(hasValidToken ? '/admin' : '/login', request.url)
        )
    }

    if (isLoginPage && hasValidToken) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    if (isAdminPage && !hasValidToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/admin/:path*'
    ],
}
