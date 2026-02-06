import { API_URL} from "@/lib/urls";

export async function loginAdmin(credentials: { email: string; password: string }) {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
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
        console.error("Error en loginAdmin:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Ocurrió un error inesperado",
        };
    }
}

export async function logoutAdmin() {
    try {
        const res = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
            cache: "no-store",
        });

        const data = await res.json();

        return {
            success: data.success ?? res.ok,
            message: data.message ?? "Operación exitosa",
        };
    } catch (error: any) {
        console.error("Error en logout:", error);
        return {
            success: false,
            message: error.message || "Ocurrió un error inesperado",
        };
    }
}