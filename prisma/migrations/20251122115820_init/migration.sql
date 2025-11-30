-- CreateTable
CREATE TABLE "conversions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "fromValue" REAL NOT NULL,
    "fromUnit" TEXT NOT NULL,
    "toValue" REAL NOT NULL,
    "toUnit" TEXT NOT NULL,
    "result" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);