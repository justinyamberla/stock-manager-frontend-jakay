import { items } from "@/lib/db.json"
import { Item } from "@/types/domain"
import { generateId, nowISO } from "@/lib/utils"
import {readDB, writeDB} from "@/lib/dbHelper";

export function createItem(data: Pick<Item, "name" | "category">) {
    const db = readDB()
    const items = db.items

    const exists = items.find((i: Item) => i.name === data.name && i.category === data.category)
    if (exists) throw new Error("El item ya existe en esta categoría")

    const item: Item = {
        id: generateId("item"),
        name: data.name,
        category: data.category,
        status: "ACTIVE",
        createdAt: nowISO()
    }

    items.push(item)

    writeDB({
        ...db,
        items
    })

    return item
}

export function createItemsBatch(data: Pick<Item, "name" | "category">) {
    const created = data.map(name => createItem(name, category))
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
