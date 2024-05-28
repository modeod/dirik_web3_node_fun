-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "homeAdress" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "salaryFixed" DOUBLE PRECISION NOT NULL,
    "salarayPercent" DOUBLE PRECISION NOT NULL,
    "availableSalary" DOUBLE PRECISION NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "INN" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "priceMinimal" DOUBLE PRECISION NOT NULL,
    "priceForHour" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" SERIAL NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "availableCash" DOUBLE PRECISION NOT NULL,
    "totalCash" DOUBLE PRECISION NOT NULL,
    "totalMoney" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" SERIAL NOT NULL,
    "shiftId" INTEGER NOT NULL,
    "totemName" TEXT NOT NULL,
    "clientsAmount" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "isPriceFixed" BOOLEAN NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3),
    "resultPrice" DOUBLE PRECISION NOT NULL,
    "cash" DOUBLE PRECISION NOT NULL,
    "terminal" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
