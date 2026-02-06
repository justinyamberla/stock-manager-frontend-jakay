import { Category, Item, Movement } from "@/types/domain"
import { AdminUser } from "@/types/auth"

export const adminUser: AdminUser = {
    id: "admin_1",
    email: "admin@test.com",
    passwordHash: "123456",
    role: "ADMIN"
}

export const categories: Category[] = [
    {
        id: '1',
        name: 'Electrónica',
        description: 'Dispositivos electrónicos y accesorios',
        status: 'ACTIVE',
        createdAt: "2024-01-01T00:00:00.000Z",
    },
    {
        id: '2',
        name: 'Muebles',
        description: 'Mobiliario de oficina y hogar',
        status: 'INACTIVE',
        createdAt: "2024-01-01T00:00:00.000Z",
    },
    {
        id: '3',
        name: 'Herramientas',
        description: 'Herramientas manuales y eléctricas',
        status: 'ACTIVE',
        createdAt: "2024-01-01T00:00:00.000Z",
    }
]

export const items: Item[] = []

export const movements: Movement[] = []
