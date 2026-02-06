import { API_URL} from "@/lib/urls";

export async function fetchCategories() {
    try {
        const res = await fetch(`${API_URL}/categories/`, {
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
        console.error("Error en fetchCategories:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Ocurrió un error inesperado",
        };
    }
}

export async function createCategory(category: { name: string; description: string }) {
    try {
        const res = await fetch(`${API_URL}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
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
        console.error("Error en createCategory:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Ocurrió un error inesperado",
        };
    }
}