export function generateId(prefix: string) {
    return `${prefix}_${crypto.randomUUID().slice(0, 8)}`
}

export function nowISO() {
    return new Date().toISOString()
}
