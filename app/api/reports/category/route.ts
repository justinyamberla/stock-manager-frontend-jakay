import { NextResponse } from "next/server"
import { getItemsCountByCategory } from "@/repositories/report.repo"

export async function GET() {
    const data = getItemsCountByCategory()
    return NextResponse.json({ success: true, data })
}
