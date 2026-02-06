import { NextResponse } from "next/server"
import { getCategoryMetrics } from "@/repositories/report.repo"

export async function GET(_: Request, { params }: any) {
    const data = getCategoryMetrics(params.name)
    return NextResponse.json({ success: true, data })
}
