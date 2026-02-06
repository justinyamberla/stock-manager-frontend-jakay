import { API_URL} from "@/lib/urls";

export async function getCategoryReport() {
    const res = await fetch(`${API_URL}/reports/category/`)

    return res.json()
}

export async function getCategoryMetrics(name: string) {
    const res = await fetch(`${API_URL}/reports/category/${name}/`)

    return res.json()
}
