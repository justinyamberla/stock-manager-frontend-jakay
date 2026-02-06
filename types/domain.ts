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
    category: string
    status: "ACTIVE" | "INACTIVE"
    createdAt: string
}

export type Movement = {
    id: string
    type: "ADD" | "DEACTIVATE"
    mode: "SINGLE" | "BATCH"
    targetIds: string[]
    timestamp: string
}
