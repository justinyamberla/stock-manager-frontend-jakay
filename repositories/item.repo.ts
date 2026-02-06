import { Item } from "@/types/domain"
import { generateId, formattedTodayDate } from "@/lib/utils"
import {readDB, writeDB} from "@/lib/dbHelper";

export function getItems() {
    const db = readDB()
    return db.items
}

export function getItemById(id: string) {
    const db = readDB()
    const item = db.items.find((i: Item) => i.id === id)
    if (!item) throw new Error("Item no encontrado")
    return item
}

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
        createdAt: formattedTodayDate()
    }

    items.push(item)

    writeDB({
        ...db,
        items
    })

    return item
}

export function updateItem(id: string, data: Partial<Pick<Item, "name" | "category" | "status">>) {
    const db = readDB()
    const items = db.items

    const itemIndex = items.findIndex((i: Item) => i.id === id)
    if (itemIndex === -1) throw new Error("Item no encontrado")

    const updatedItem = {
        ...items[itemIndex],
        ...data
    }

    items[itemIndex] = updatedItem

    writeDB({
        ...db,
        items
    })

    return updatedItem
}