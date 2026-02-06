import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getCategories, createCategory } from "@/repositories/category.repo"

export async function GET() {
    try {
        const categories = getCategories()

        return NextResponse.json({
            success: true,
            message: "Categorías obtenidas correctamente",
            data: categories,
        }, {status: 200})

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message,
        }, {status: 400})
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()

        if (!data.name || !data.description) {
            return NextResponse.json({
                success: false,
                message: "Los campos son obligatorios",
            }, { status: 400 })
        }

        const category = createCategory(data)

        return NextResponse.json({
            success: true,
            message: "Categoría creada correctamente",
            data: category,
        }, { status: 201 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message,
        }, { status: 500 })
    }
}
