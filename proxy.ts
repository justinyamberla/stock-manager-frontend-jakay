import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/jwt'

export function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const path = request.nextUrl.pathname

    const isApi = path.startsWith('/api')
    const isAuthApi = path.startsWith('/api/auth')
    const isLoginPage = path.startsWith('/login')
    const isAdminPage = path.startsWith('/admin')

    if (isAuthApi) {
        return NextResponse.next()
    }

    if (isApi) {
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        try {
            verifyToken(token)
            return NextResponse.next()
        } catch {
            return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
        }
    }

    if (isAdminPage && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isLoginPage) {
        return NextResponse.next()
    }

    if (path === '/') {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/api/:path*',
        '/admin/:path*',
        '/'
    ],
}
