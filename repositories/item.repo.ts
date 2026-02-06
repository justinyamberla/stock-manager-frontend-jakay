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
    const categories = db.categories

    const exists = items.find((i: Item) => i.name === data.name && i.category === data.category)
    if (exists) throw new Error("El item ya existe en esta categoría")

    const categoryExists = categories.find((c: { name: string; }) => c.name === data.category)

    if (!categoryExists) {
        throw new Error("La categoría ingresada no existe")
    }

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

export function createItemsBatch(batch: { name: string; category: string }[]) {
    const db = readDB()
    const categories = db.categories
    const items = db.items

    const createdItems = []

    for (const entry of batch) {
        if (!entry.name || !entry.category) {
            throw new Error("Linea de lote mal formateada")
        }

        const categoryExists = categories.find((c: { name: string; }) => c.name === entry.category)

        if (!categoryExists) {
            throw new Error("Una categoría ingresada en el lote no existe")
        }

        const newItem = {
            id: generateId("item"),
            name: entry.name,
            category: entry.category,
            status: "ACTIVE",
            createdAt: formattedTodayDate()
        }

        items.push(newItem)
        writeDB({
            ...db,
            items
        })

        createdItems.push(newItem)
    }

    return createdItems;
}

export function deactivateItemsBatch(itemIds: string[]) {
    const db = readDB()
    const items = db.items

    const updatedItems = []

    for (const id of itemIds) {
        const item = items.find((i: { id: string }) => i.id === id)

        if (!item) {
            throw new Error(`El bien con id ${id} no existe`)
        }

        if (item.status === "INACTIVE") {
            continue
        }

        item.status = "INACTIVE"
        updatedItems.push(item)
    }

    writeDB({
        ...db,
        items
    })

    return updatedItems
}

