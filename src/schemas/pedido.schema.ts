import z from "zod"

export const pedidoSchema = z.object({
    cantidad: z.number().positive()
})