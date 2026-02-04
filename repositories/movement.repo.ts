import { movements } from "@/lib/db"
import { Movement } from "@/types/domain"
import { generateId, nowISO } from "@/lib/utils"

export function logMovement(
    type: Movement["type"],
    mode: Movement["mode"],
    targetIds: string[]
) {
    const movement: Movement = {
        id: generateId("mov"),
        type,
        mode,
        targetIds,
        timestamp: nowISO()
    }

    movements.push(movement)
    return movement
}

export function getMovements() {
    return movements
}
