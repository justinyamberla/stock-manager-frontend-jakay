import { items } from "@/lib/db"
import { Item } from "@/types/domain"
import { generateId, nowISO } from "@/lib/utils"

export function createItem(name: string, categoryId: string) {
    const item: Item = {
        id: generateId("item"),
        name,
        categoryId,
        status: "ACTIVE",
        createdAt: nowISO()
    }

    items.push(item)
    return item
}

export function createItemsBatch(categoryId: string, names: string[]) {
    const created = names.map(name => createItem(name, categoryId))
    return created
}

export function getItems(filters?: { status?: string, categoryId?: string }) {
    return items.filter(item => {
        if (filters?.status && item.status !== filters.status) return false
        if (filters?.categoryId && item.categoryId !== filters.categoryId) return false
        return true
    })
}

export function deactivateItem(id: string) {
    const item = items.find(i => i.id === id)
    if (!item) throw new Error("Item not found")

    item.status = "INACTIVE"
    return item
}

export function deactivateItemsBatch(ids: string[]) {
    const updated = []

    for (const id of ids) {
        const item = deactivateItem(id)
        updated.push(item)
    }

    return updated
}
