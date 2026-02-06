import fs from "fs"
import path from "path"

const dbPath = path.join(process.cwd(), "lib/db.json")

export function readDB() {
    const raw = fs.readFileSync(dbPath, "utf-8")
    return JSON.parse(raw)
}

export function writeDB(data: any) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}
