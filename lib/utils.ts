export function generateId(prefix: string) {
    return `${prefix}_${crypto.randomUUID()}`
}

export function nowISO() {
    return new Date().toISOString()
}
