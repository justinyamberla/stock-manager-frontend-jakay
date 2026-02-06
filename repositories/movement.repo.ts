import { Movement } from "@/types/domain"
import { generateId, formattedTodayDate } from "@/lib/utils"
import {readDB} from "@/lib/dbHelper";

export function logMovement(
    type: Movement["type"],
    mode: Movement["mode"],
    targetIds: string[]
) {
    const db = readDB()
    const movements = db.movements

    const movement: Movement = {
        id: generateId("mov"),
        type,
        mode,
        targetIds,
        timestamp: formattedTodayDate()
    }

    movements.push(movement)
    return movement
}

export function getMovements() {
    const db = readDB()
    const movements = db.movements

    return movements
}
