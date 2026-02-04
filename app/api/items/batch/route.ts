import { NextResponse, NextRequest } from "next/server"
import { createItemsBatch } from "@/repositories/item.repo"
import { logMovement } from "@/repositories/movement.repo"

export async function POST(req: NextRequest) {
    try {
        const { categoryId, items } = await req.json()

        if (!categoryId || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: "Invalid batch data" },
                { status: 400 }
            )
        }

        const names = items.map((i: { name: string }) => i.name)

        const created = createItemsBatch(categoryId, names)

        logMovement(
            "ADD",
            "BATCH",
            created.map(i => i.id)
        )

        return NextResponse.json(created, { status: 201 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}
