import { NextResponse } from "next/server"
import { categories, items } from "@/lib/db.json"

export async function GET() {
    const report = categories.map(category => {
        const related = items.filter(i => i.categoryId === category.id)

        const activeCount = related.filter(i => i.status === "ACTIVE").length
        const inactiveCount = related.filter(i => i.status === "INACTIVE").length

        return {
            categoryId: category.id,
            categoryName: category.name,
            activeCount,
            inactiveCount
        }
    })

    return NextResponse.json(report)
}
