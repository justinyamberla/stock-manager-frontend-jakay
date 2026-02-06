import { API_URL} from "@/lib/urls";

export async function getMovements() {
    const res = await fetch(`${API_URL}/movements/`)
    return res.json()
}
