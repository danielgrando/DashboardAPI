/*
  Warnings:

  - You are about to drop the column `modality` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `sub_type` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `type_offer` on the `Courses` table. All the data in the column will be lost.
  - Added the required column `attributeId` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "modality",
DROP COLUMN "sub_type",
DROP COLUMN "type_offer",
ADD COLUMN     "attributeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Attributes" (
    "id" TEXT NOT NULL,
    "sub_type" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "type_offer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attributes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
