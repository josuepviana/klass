-- CreateEnum
CREATE TYPE "Turno" AS ENUM ('MATUTINO', 'VERSPERTINO', 'NOTURNO');

-- CreateEnum
CREATE TYPE "Modalide" AS ENUM ('PRESENCIAL', 'EAD', 'HIBRIDO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT E'default-avatar.jpg',
    "banner" TEXT NOT NULL DEFAULT E'default-banner.jpg',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "sobre" TEXT,
    "ocupacao" TEXT,
    "faculdadeId" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculdade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Faculdade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "turno" "Turno",
    "modalide" "Modalide" NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "statusId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resposta" (
    "id" SERIAL NOT NULL,
    "comentarioId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,

    CONSTRAINT "Resposta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_amigos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CursoToFaculdade" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_amigos_AB_unique" ON "_amigos"("A", "B");

-- CreateIndex
CREATE INDEX "_amigos_B_index" ON "_amigos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CursoToFaculdade_AB_unique" ON "_CursoToFaculdade"("A", "B");

-- CreateIndex
CREATE INDEX "_CursoToFaculdade_B_index" ON "_CursoToFaculdade"("B");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_faculdadeId_fkey" FOREIGN KEY ("faculdadeId") REFERENCES "Faculdade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_comentarioId_fkey" FOREIGN KEY ("comentarioId") REFERENCES "Comentario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_amigos" ADD FOREIGN KEY ("A") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_amigos" ADD FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CursoToFaculdade" ADD FOREIGN KEY ("A") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CursoToFaculdade" ADD FOREIGN KEY ("B") REFERENCES "Faculdade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
