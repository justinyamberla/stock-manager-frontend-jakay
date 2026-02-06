import { NextResponse, NextRequest } from "next/server"
import { getCategoryById, updateCategory } from "@/repositories/category.repo"

export async function GET( _req: NextRequest, { params }: { params: Promise<{ id: string }> } ) {
    const { id } = await params

    try {
        const category = getCategoryById(id)

        return NextResponse.json({
            success: true,
            message: "Categoría obtenida correctamente",
            data: category,
        }, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message,
        }, {status: 404})
    }
}

export async function PUT( req: NextRequest, { params }: { params: Promise<{ id: string }> } ) {
    try {
        const { id } = await params
        const data = await req.json()

        const updated = updateCategory(id, data)

        return NextResponse.json({
            success: true,
            message: "Categoría actualizada correctamente",
            data: updated,
        }, { status: 201 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message,
        }, {status: 404})
    }
}
