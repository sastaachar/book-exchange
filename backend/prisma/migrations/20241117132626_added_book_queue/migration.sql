-- CreateTable
CREATE TABLE "BookQueue" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookName" TEXT NOT NULL,
    "bookAuthor" TEXT NOT NULL,
    "exchangeLocation" TEXT NOT NULL,

    CONSTRAINT "BookQueue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookQueue" ADD CONSTRAINT "BookQueue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
