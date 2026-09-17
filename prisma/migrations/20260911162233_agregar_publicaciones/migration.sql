-- CreateTable
CREATE TABLE "Publicacion" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "UsuarioId" INTEGER NOT NULL,

    CONSTRAINT "Publicacion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Publicacion" ADD CONSTRAINT "Publicacion_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
