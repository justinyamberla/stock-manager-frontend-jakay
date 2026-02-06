import { API_URL} from "@/lib/urls";
import { Item } from "@/types/domain";

export async function fetchItems() {
    try {
        const res = await fetch(`${API_URL}/items/`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            cache: "no-store",
        });

        const data = await res.json();

        return {
            success: data.success ?? res.ok,
            data: data.data ?? null,
            message: data.message ?? "Operación exitosa",
        };
    } catch (error: any) {
        console.error("Error en fetchItems:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Ocurrió un error inesperado",
        };
    }
}

export async function getItemById(id: string) {
    try {
        const res = await fetch(`${API_URL}/items/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            cache: "no-store",
        });
        const data = await res.json();
        return {
            success: data.success ?? res.ok,
            data: data.data ?? null,
            message: data.message ?? "Operación exitosa",
        };
    } catch (error: any) {
        console.error("Error en getItemById:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Ocurrió un error inesperado",
        };
    }
}

export async function createItem(item: Partial<Item>) {
    try {
        const res = await fetch(`${API_URL}/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(item),
        });

        const data = await res.json();

        return {
            success: data.success ?? res.ok,
            data: data.data ?? null,
            message: data.message ?? "Operación exitosa",
        };
    } catch (error: any) {
        console.error("Error en createItem:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Ocurrió un error inesperado",
        };
    }
}

export async function createBatchItems(items: Partial<Item>[]) {
    try {
        const res = await fetch(`${API_URL}/items/batch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(items),
        });

        const data = await res.json();

        return {
            success: data.success ?? res.ok,
            data: data.data ?? null,
            message: data.message ?? "Operación exitosa",
        };
    } catch (error: any) {
        console.error("Error en createBatchItems:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Ocurrió un error inesperado",
        };
    }
}

export async function deactivateItemsBatch(itemIds: string[]) {
    try {
        const res = await fetch(`${API_URL}/items/batch/deactivate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ itemIds }),
            credentials: "include"
        })

        const data = await res.json()

        return {
            success: data.success ?? res.ok,
            data: data.data ?? null,
            message: data.message ?? null
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}
