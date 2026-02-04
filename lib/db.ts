import { Category, Item, Movement } from "@/types/domain"
import { AdminUser } from "@/types/auth"

export const adminUser: AdminUser = {
    id: "admin_1",
    email: "admin@test.com",
    passwordHash: "123456",
    role: "ADMIN"
}

export const categories: Category[] = []

export const items: Item[] = []

export const movements: Movement[] = []
