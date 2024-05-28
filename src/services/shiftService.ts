import { Shift } from "../types/models";
import prisma from "../prisma/client";

/*
(alias) type Shift = {
  id: number;
  creatorId: number;
  locationId: number;
  startDate: Date;
  endDate: Date | null;
  availableCash: number;
  totalCash: number;
  totalMoney: number;
}
*/

interface CreateShiftInput {
  creatorId: number;
  locationId: number;
  startDate: string;
  availableCash: number;
  totalCash: number;
  totalMoney: number;
}

const createShift = async (data: CreateShiftInput): Promise<Shift> => {
  const openShift = await prisma.shift.findFirst({
    where: { locationId: data.locationId, endDate: null },
  });

  if (openShift) {
    throw new Error("There is already an open shift in this location");
  }

  return await prisma.shift.create({ data });
};

const closeShift = async (id: number): Promise<Shift> => {
  const shift = await prisma.shift.findUnique({
    where: { id },
    include: { visits: true },
  });

  if (!shift) {
    throw new Error("Shift not found");
  }

  const openVisits = shift.visits.filter((visit) => visit.endAt === null);

  if (openVisits.length > 0) {
    throw new Error("Cannot close shift with open visits");
  }

  return await prisma.shift.update({
    where: { id },
    data: { endDate: new Date() },
  });
};

const getShifts = async (): Promise<Shift[]> => {
  return await prisma.shift.findMany();
};

const getShiftById = async (id: number): Promise<Shift | null> => {
  return await prisma.shift.findUnique({ where: { id } });
};

const deleteShift = async (id: number): Promise<Shift | null> => {
  return await prisma.shift.delete({ where: { id } });
};

export default {
  createShift,
  getShifts,
  getShiftById,
  closeShift,
  deleteShift,
};
