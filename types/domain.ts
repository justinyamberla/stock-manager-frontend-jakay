export type Category = {
    id: string
    name: string
    description?: string
    status: "ACTIVE" | "INACTIVE"
    createdAt: string
}

export type Item = {
    id: string
    name: string
    categoryId: string
    status: "ACTIVE" | "INACTIVE"
    createdAt: string
}

export type Movement = {
    id: string
    type: "ADD" | "REMOVE"
    mode: "SINGLE" | "BATCH"
    targetIds: string[]
    timestamp: string
}
