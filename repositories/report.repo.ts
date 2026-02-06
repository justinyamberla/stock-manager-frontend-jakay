import { readDB } from "@/lib/dbHelper"

export function getItemsCountByCategory() {
    const db = readDB()
    const categories = db.categories
    const items = db.items

    return categories.map((cat: any) => {
        const related = items.filter((i: any) => i.category === cat.name)

        return {
            category: cat.name,
            active: related.filter((i: { status: string }) => i.status === "ACTIVE").length,
            inactive: related.filter((i: { status: string }) => i.status === "INACTIVE").length,
            total: related.length
        }
    })
}

export function getCategoryMetrics(categoryName: string) {
    const db = readDB()
    const items = db.items.filter((i: any) => i.category === categoryName)

    return {
        category: categoryName,
        active: items.filter((i: { status: string }) => i.status === "ACTIVE").length,
        inactive: items.filter((i: { status: string }) => i.status === "INACTIVE").length,
        total: items.length
    }
}
