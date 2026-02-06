import { NextResponse, NextRequest } from "next/server"
import { createItemsBatch } from "@/repositories/item.repo"
import { logMovement } from "@/repositories/movement.repo"

export async function POST(req: NextRequest) {
    try {
        const items = await req.json()

        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { success: false, message: "Lote vacío o inválido" },
                { status: 400 }
            )
        }

        const created = createItemsBatch(items)

        logMovement(
            "ADD",
            "BATCH",
            created.map(i => i.id)
        )

        return NextResponse.json({
            success: true,
            message: `Se crearon ${created.length} bienes`,
            data: created
        }, { status: 201 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message,
        }, { status: 400 })
    }
}
