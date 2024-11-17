/*
  Warnings:

  - Added the required column `start` to the `BookQueue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookQueue" ADD COLUMN     "acceptedUser" TEXT,
ADD COLUMN     "from" TIMESTAMP(3),
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "to" TIMESTAMP(3),
ALTER COLUMN "bookAuthor" DROP NOT NULL,
ALTER COLUMN "exchangeLocation" DROP NOT NULL;

-- CreateTable
CREATE TABLE "BookRequests" (
    "id" SERIAL NOT NULL,
    "fromUserId" INTEGER NOT NULL,
    "bookQueueId" INTEGER NOT NULL,

    CONSTRAINT "BookRequests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookRequests" ADD CONSTRAINT "BookRequests_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookRequests" ADD CONSTRAINT "BookRequests_bookQueueId_fkey" FOREIGN KEY ("bookQueueId") REFERENCES "BookQueue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
