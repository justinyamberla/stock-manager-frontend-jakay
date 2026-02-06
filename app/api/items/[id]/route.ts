import {NextRequest, NextResponse} from "next/server";
import {getItemById, updateItem} from "@/repositories/item.repo";
import {logMovement} from "@/repositories/movement.repo";

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

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const updates = await req.json()
        const { id } = await params

        const { updatedItem, previousStatus } = updateItem(id, updates)

        if (previousStatus !== updatedItem.status) {
            logMovement(
                updatedItem.status === "ACTIVE" ? "ADD" : "DEACTIVATE",
                "SINGLE",
                [updatedItem.id]
            )
        }

        return Response.json({
            success: true,
            message: "Bien actualizado correctamente",
            data: updatedItem
        }, { status: 200 })

    } catch (err: any) {
        return Response.json({ success: false, message: err.message }, { status: 400 })
    }
}