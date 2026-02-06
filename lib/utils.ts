export function generateId(prefix: string) {
    return `${prefix}_${crypto.randomUUID().slice(0, 8)}`
}

export function formattedTodayDate() {
    const date = new Date()
    return date.toISOString().replace("T", " ").split(".")[0]
}
