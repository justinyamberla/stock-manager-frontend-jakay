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
        return NextResponse.json(
            { error: err.message },
            { status: 404 }
        )
    }
}
export async function PUT( req: NextRequest, { params }: { params: Promise<{ id: string }> } ) {
    try {
        const { name, description, status } = await req.json()

        const updated = updateCategory(
            (await params).id,
            name,
            description,
            status
        )

        return NextResponse.json(updated)
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 404 }
        )
    }
}
