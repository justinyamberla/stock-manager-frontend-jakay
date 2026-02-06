import { NextResponse, NextRequest } from "next/server"
import { createItem, getItems } from "@/repositories/item.repo"

export async function GET() {
    try {
        const items = getItems()

        return NextResponse.json({
            success: true,
            message: "Bienes obtenidos correctamente",
            data: items,
        }, {status: 200})

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message,
        }, {status: 500})
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()

        if (!data.name || !data.category) {
            return NextResponse.json({
                success: false,
                message: "Los campos son obligatorios",
            }, { status: 400 })
        }

        const category = createItem(data)

        return NextResponse.json({
            success: true,
            message: "Bien creado correctamente",
            data: category,
        }, { status: 201 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message,
        }, { status: 500 })
    }
}
