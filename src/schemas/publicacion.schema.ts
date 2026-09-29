import {z} from "zod"

export const publicacionSchema = z.object({
    titulo: z.string().min(1).max(100),
    contenido: z.string().min(2).max(500),
    usuarioId: z.number().positive()
})

export type publicacionInput = z.infer<typeof publicacionSchema>

const ejemplo: publicacionInput = {
    titulo: "Søren Kierkegaard",
    contenido: "Teoria de las distintas fases (estetica, etica y religiosa)",
    usuarioId: 11 // Usuario aun no existente, habria que crear a Søren Kierkegaard
}