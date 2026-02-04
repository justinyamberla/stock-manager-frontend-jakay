import { NextResponse } from "next/server"
import { getMovements } from "@/repositories/movement.repo"

export async function GET() {
    return NextResponse.json(getMovements())
}
