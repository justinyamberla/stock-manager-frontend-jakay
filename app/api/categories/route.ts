import { NextResponse } from "next/server"
import { getCategories, createCategory } from "@/repositories/category.repo"

export async function GET() {
    return NextResponse.json(getCategories())
}

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const category = createCategory(data)

        return NextResponse.json(category, { status: 201 })
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 400 }
        )
    }
}
