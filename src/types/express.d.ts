import type { publicacionInput } from "../schemas/publicacion.schema.js"

declare global {
    namespace Express {
        interface Request {
            validatedData: unknown
        }
    }
}

export {}