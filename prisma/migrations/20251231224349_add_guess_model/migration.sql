-- CreateTable
CREATE TABLE "Guess" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guestId" TEXT NOT NULL,
    "guessedDate" TIMESTAMP(3) NOT NULL,
    "guessedTime" TEXT NOT NULL,

    CONSTRAINT "Guess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guess_guestId_key" ON "Guess"("guestId");

-- AddForeignKey
ALTER TABLE "Guess" ADD CONSTRAINT "Guess_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
