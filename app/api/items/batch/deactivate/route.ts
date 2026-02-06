import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { deactivateItemsBatch } from "@/repositories/item.repo"
import { logMovement } from "@/repositories/movement.repo"

export async function POST(req: NextRequest) {
    try {
        const { itemIds } = await req.json()

        if (!Array.isArray(itemIds) || itemIds.length === 0) {
            return NextResponse.json(
                { success: false, message: "No hay bienes seleccionados" },
                { status: 400 }
            )
        }

        const updated = deactivateItemsBatch(itemIds)

        logMovement(
            "DEACTIVATE",
            "BATCH",
            updated.map(i => i.id)
        )

        return NextResponse.json({
            success: true,
            message: `${updated.length} bienes dados de baja`,
            data: updated
        })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message
        }, { status: 400 })
    }
}
