import { NextResponse } from "next/server"
import { items } from "@/lib/db"

export async function GET(
    _: Request,
    { params }: { params: { id: string } }
) {
    const related = items.filter(i => i.categoryId === params.id)

    const activeCount = related.filter(i => i.status === "ACTIVE").length
    const inactiveCount = related.filter(i => i.status === "INACTIVE").length

    return NextResponse.json({
        categoryId: params.id,
        activeCount,
        inactiveCount
    })
}
