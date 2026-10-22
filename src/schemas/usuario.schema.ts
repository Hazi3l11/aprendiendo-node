import { z } from "zod"

export const usuarioSchema = z.object({
    nombre: z.string().min(3).max(50),
    edad: z.number().positive(),
    carrera: z.string().min(3).max(50)
})

export type usuarioInput = z.infer<typeof usuarioSchema>