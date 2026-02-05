import { NextResponse } from "next/server"
import type { NextRequest } from 'next/server'
import { adminUser } from "../../../../lib/db"
import { signToken } from "../../../../lib/jwt"

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    if (
        email !== adminUser.email ||
        password !== adminUser.passwordHash
    ) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        )
    }

    const token = signToken({
        id: adminUser.id,
        role: adminUser.role,
        email: adminUser.email
    })

    const res = NextResponse.json({ success: true })

    res.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/"
    })

    return res
}
