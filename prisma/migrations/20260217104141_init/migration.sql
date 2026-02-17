-- CreateEnum
CREATE TYPE "Rod" AS ENUM ('машки', 'женски', 'среден');

-- CreateTable
CREATE TABLE "zborovi" (
    "id" SERIAL NOT NULL,
    "zbor" VARCHAR(50) NOT NULL,
    "vid" VARCHAR(10) NOT NULL,
    "rod" "Rod",
    "znacenje" TEXT NOT NULL,

    CONSTRAINT "zborovi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "zborovi_zbor_idx" ON "zborovi"("zbor");

-- CreateIndex
CREATE INDEX "zborovi_zbor_vid_idx" ON "zborovi"("zbor", "vid");
