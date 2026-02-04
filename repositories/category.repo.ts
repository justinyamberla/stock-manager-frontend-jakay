import { categories } from "@/lib/db"
import { Category } from "@/types/domain"
import { generateId, nowISO } from "@/lib/utils"

export function createCategory(data: Pick<Category, "name" | "description">) {
    const exists = categories.find(c => c.name === data.name)

    if (exists) throw new Error("Category already exists")

    const category: Category = {
        id: generateId("cat"),
        name: data.name,
        description: data.description,
        status: "ACTIVE",
        createdAt: nowISO()
    }

    categories.push(category)
    return category
}

export function getCategories() {
    return categories
}

export function updateCategory(id: string, updates: Partial<Category>) {
    const category = categories.find(c => c.id === id)
    if (!category) throw new Error("Category not found")

    Object.assign(category, updates)
    return category
}
