-- 1. Eliminar la restricción foreign key antigua
ALTER TABLE "Publicacion" DROP CONSTRAINT "Publicacion_UsuarioId_fkey";

-- 2. Renombrar la columna existente (mantiene los datos intactos)
ALTER TABLE "Publicacion" RENAME COLUMN "UsuarioId" TO "usuarioId";

-- 3. Crear la nueva restricción foreign key con el nombre de columna actualizado
ALTER TABLE "Publicacion" ADD CONSTRAINT "Publicacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;