import { NextResponse, NextRequest } from "next/server"
import { createItem, getItems } from "@/repositories/item.repo"
import { logMovement } from "@/repositories/movement.repo"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const status = searchParams.get("status") as "ACTIVE" | "INACTIVE" | null
    const categoryId = searchParams.get("categoryId")

    const items = getItems({
        status: status || undefined,
        categoryId: categoryId || undefined,
    })

    return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
    try {
        const { name, categoryId } = await req.json()

        if (!name || !categoryId) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            )
        }

        const item = createItem(name, categoryId)

        logMovement("ADD", "SINGLE", [item.id])

        return NextResponse.json(item, { status: 201 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}
