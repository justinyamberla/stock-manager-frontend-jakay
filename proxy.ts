import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from "@/lib/jwt"

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value

    if (!token && request.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (token) {
        try {
            verifyToken(token)
            return NextResponse.next()
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 403 })
        }
    }

    return NextResponse.next()
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: ["/api/:path*"]
}