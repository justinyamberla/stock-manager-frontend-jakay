import { Category } from "@/types/domain"
import { generateId, nowISO } from "@/lib/utils"
import { readDB, writeDB } from "@/lib/dbHelper"

export function getCategories() {
    const db = readDB()
    return db.categories
}

export function getCategoryById(id: string) {
    const db = readDB()
    const category = db.categories.find((c: Category) => c.id === id)
    if (!category) throw new Error("Categoría no encontrada")
    return category
}

export function createCategory(data: Pick<Category, "name" | "description">) {
    const db = readDB()
    const categories = db.categories

    const exists = categories.find((c: Category) => c.name === data.name)
    if (exists) throw new Error("La categoría ya existe")

    const category: Category = {
        id: generateId("cat"),
        name: data.name,
        description: data.description,
        status: "ACTIVE",
        createdAt: nowISO()
    }

    categories.push(category)

    writeDB({
        ...db,
        categories
    })

    return category
}

export function updateCategory(id: string, updates: Partial<Category>, description: any, status: any) {
    const db = readDB()
    const categories = db.categories

    const category = categories.find((c: Category) => c.id === id)
    if (!category) throw new Error("Categoría no encontrada")

    Object.assign(category, updates)

    writeDB({
        ...db,
        categories
    })

    return category
}
