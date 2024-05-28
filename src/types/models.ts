import {
  Employee as PrismaEmployee,
  Location as PrismaLocation,
  Shift as PrismaShift,
  Visit as PrismaVisit,
} from "@prisma/client";

export type Employee = PrismaEmployee;
export type Location = PrismaLocation;
export type Shift = PrismaShift;
export type Visit = PrismaVisit;
