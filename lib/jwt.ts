import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "a2cc836cdb6501d7ac16d36d9a2e09a72249298c68b67f5ece814ff219aec1fd"

export function signToken(payload: object) {
    return jwt.sign(payload, SECRET, { expiresIn: "1h" })
}

export function verifyToken(token: string) {
    return jwt.verify(token, SECRET)
}
