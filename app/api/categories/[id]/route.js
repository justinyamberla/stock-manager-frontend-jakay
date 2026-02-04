import { NextResponse, NextRequest } from "next/server"
import { updateCategory } from "../../../../repositories/category.repo"

export async function PUT( req: NextRequest, { params }: { params: Promise<{ id: string }> } ) {
    try {
        const { name, description, status } = await req.json()

        const updated = updateCategory(
            params.id,
            name,
            description,
            status
        )

        return NextResponse.json(updated)
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 404 }
        )
    }
}
