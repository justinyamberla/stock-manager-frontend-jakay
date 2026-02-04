import { NextResponse, NextRequest } from "next/server"
import { deactivateItemsBatch } from "@/repositories/item.repo"
import { logMovement } from "@/repositories/movement.repo"

export async function PATCH(req: NextRequest) {
    try {
        const { itemIds } = await req.json()

        if (!Array.isArray(itemIds) || itemIds.length === 0) {
            return NextResponse.json(
                { error: "Invalid batch ids" },
                { status: 400 }
            )
        }

        const updated = deactivateItemsBatch(itemIds)

        logMovement("REMOVE", "BATCH", itemIds)

        return NextResponse.json(updated)
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}
