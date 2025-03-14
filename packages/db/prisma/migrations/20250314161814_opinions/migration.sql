-- CreateTable
CREATE TABLE "Opinions" (
    "id" TEXT NOT NULL,
    "opinion" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL,
    "downvotes" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Opinions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Opinions" ADD CONSTRAINT "Opinions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
