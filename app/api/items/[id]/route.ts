import {NextRequest, NextResponse} from "next/server";
import {getItemById, updateItem} from "@/repositories/item.repo";

export async function GET( _req: NextRequest, { params }: { params: Promise<{ id: string }> } ) {
    const { id } = await params

    try {
        const category = getItemById(id)

        return NextResponse.json({
            success: true,
            message: "Bien obtenido correctamente",
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

        const updated = updateItem(id, data)

        return NextResponse.json({
            success: true,
            message: "Bien actualizado correctamente",
            data: updated,
        }, { status: 201 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message,
        }, {status: 404})
    }
}