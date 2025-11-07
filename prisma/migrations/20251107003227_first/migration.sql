-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isAttending" BOOLEAN NOT NULL,
    "message" TEXT,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GiftItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "isReserved" BOOLEAN NOT NULL DEFAULT false,
    "reservedById" TEXT,

    CONSTRAINT "GiftItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guest_email_key" ON "Guest"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GiftItem_reservedById_key" ON "GiftItem"("reservedById");

-- AddForeignKey
ALTER TABLE "GiftItem" ADD CONSTRAINT "GiftItem_reservedById_fkey" FOREIGN KEY ("reservedById") REFERENCES "Guest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
