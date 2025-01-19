-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- CreateEnum
CREATE TYPE "GolonganDarah" AS ENUM ('A', 'B', 'AB', 'O');

-- CreateEnum
CREATE TYPE "RutinitasOlahraga" AS ENUM ('TIDAK', 'KURANG', 'CUKUP', 'BANYAK');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagnose" (
    "id" TEXT NOT NULL,
    "usia" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "riwayat_penyakit" TEXT[],
    "berat_badan" DOUBLE PRECISION NOT NULL,
    "tinggi_badan" DOUBLE PRECISION NOT NULL,
    "rutinitas_olahraga" "RutinitasOlahraga" NOT NULL,
    "golongan_darah" "GolonganDarah" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Diagnose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HasilDiagnosa" (
    "id" TEXT NOT NULL,
    "diagnosa_umum" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "diagnoseId" TEXT NOT NULL,

    CONSTRAINT "HasilDiagnosa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrediksiPenyakit" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "sugesti" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hasilDiagnosaId" TEXT,

    CONSTRAINT "PrediksiPenyakit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RekomendasiMakanan" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "sugesti" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hasilDiagnosaId" TEXT,

    CONSTRAINT "RekomendasiMakanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RekomendasiMinuman" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "sugesti" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hasilDiagnosaId" TEXT,

    CONSTRAINT "RekomendasiMinuman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RekomendasiOlahraga" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "durasi" TEXT NOT NULL,
    "rutinitas" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hasilDiagnosaId" TEXT,

    CONSTRAINT "RekomendasiOlahraga_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "HasilDiagnosa_diagnoseId_key" ON "HasilDiagnosa"("diagnoseId");

-- AddForeignKey
ALTER TABLE "Diagnose" ADD CONSTRAINT "Diagnose_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasilDiagnosa" ADD CONSTRAINT "HasilDiagnosa_diagnoseId_fkey" FOREIGN KEY ("diagnoseId") REFERENCES "Diagnose"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrediksiPenyakit" ADD CONSTRAINT "PrediksiPenyakit_hasilDiagnosaId_fkey" FOREIGN KEY ("hasilDiagnosaId") REFERENCES "HasilDiagnosa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RekomendasiMakanan" ADD CONSTRAINT "RekomendasiMakanan_hasilDiagnosaId_fkey" FOREIGN KEY ("hasilDiagnosaId") REFERENCES "HasilDiagnosa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RekomendasiMinuman" ADD CONSTRAINT "RekomendasiMinuman_hasilDiagnosaId_fkey" FOREIGN KEY ("hasilDiagnosaId") REFERENCES "HasilDiagnosa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RekomendasiOlahraga" ADD CONSTRAINT "RekomendasiOlahraga_hasilDiagnosaId_fkey" FOREIGN KEY ("hasilDiagnosaId") REFERENCES "HasilDiagnosa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
