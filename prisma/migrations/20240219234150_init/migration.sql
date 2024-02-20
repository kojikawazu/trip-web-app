-- CreateTable
CREATE TABLE "TripAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,

    CONSTRAINT "TripAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripSession" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TripSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripUser" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "TripUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripData" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TripData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripVerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TripAccount_provider_providerAccountId_key" ON "TripAccount"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "TripSession_sessionToken_key" ON "TripSession"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "TripUser_email_key" ON "TripUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TripVerificationToken_token_key" ON "TripVerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TripVerificationToken_identifier_token_key" ON "TripVerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "TripAccount" ADD CONSTRAINT "TripAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TripUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripSession" ADD CONSTRAINT "TripSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TripUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripData" ADD CONSTRAINT "TripData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TripUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
