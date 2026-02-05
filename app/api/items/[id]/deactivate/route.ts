import { NextResponse, NextRequest } from "next/server"
import { deactivateItem } from "@/repositories/item.repo"
import { logMovement } from "@/repositories/movement.repo"

export async function PATCH(
    _: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const item = deactivateItem(params.id)

        logMovement("REMOVE", "SINGLE", [item.id])

        return NextResponse.json(item)
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 404 })
    }
}
