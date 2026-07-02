/*
  Warnings:

  - You are about to drop the column `timeAdded` on the `website_ticks` table. All the data in the column will be lost.
  - You are about to drop the column `timeAdded` on the `websites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "website_ticks" DROP COLUMN "timeAdded",
ADD COLUMN     "time_added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "websites" DROP COLUMN "timeAdded",
ADD COLUMN     "time_added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
