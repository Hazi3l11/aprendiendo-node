import {z} from "zod"

export const productoSchema = z.object({
    nombre: z.string().min(2).max(50),
    stock: z.number().nonnegative()
})

export type productoInput = z.infer<typeof productoSchema>