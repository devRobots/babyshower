-- AlterTable
ALTER TABLE "Guest" ADD COLUMN "sessionToken" TEXT;

-- Update existing records with random tokens
UPDATE "Guest" SET "sessionToken" = md5(random()::text || clock_timestamp()::text || id::text) WHERE "sessionToken" IS NULL;

-- Make sessionToken required and unique
ALTER TABLE "Guest" ALTER COLUMN "sessionToken" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Guest_sessionToken_key" ON "Guest"("sessionToken");
