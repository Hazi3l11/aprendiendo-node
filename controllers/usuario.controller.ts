import type { Request, Response } from "express"
import prisma from "../db.js"

export const obtenerUsuarios = async (
    req: Request,
    res: Response
) => {
    const usuarios = await prisma.usuario.findMany()

    res.json(usuarios)
}

export const crearUsuario = async (
    req: Request,
    res: Response
) => {
    const usuario = await prisma.usuario.create({
        data: {
            nombre: req.body.nombre,
            edad: req.body.edad,
            carrera: req.body.carrera
        }
    })

    res.status(201).json(usuario)
}