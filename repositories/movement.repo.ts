import {Movement} from "@/types/domain"
import {formattedTodayDate, generateId} from "@/lib/utils"
import {readDB, writeDB} from "@/lib/dbHelper";

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

    writeDB({
        ...db,
        movements
    })

    return movement
}

export function getMovements() {
    const db = readDB()
    return db.movements
}
