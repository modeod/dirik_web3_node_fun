import { Visit } from "../types/models";
import prisma from "../prisma/client";

/*
(alias) type Visit = {
    id: number;
    shiftId: number;
    totemName: string;
    clientsAmount: number;
    price: number;
    isPriceFixed: boolean;
    startAt: Date;
    endAt: Date | null;
    resultPrice: number;
    cash: number;
    terminal: number;
    comment: string | null;
}
*/
interface CreateVisitInput {
  shiftId: number;
  totemName: string;
  clientsAmount: number;
  price: number;
  isPriceFixed: boolean;
  startAt: Date;
}

interface CloseVisitInput {
  endAt: Date;
  resultPrice: number;
  cash: number;
  terminal: number;
  comment?: string | null;
}

const createVisit = async (data: CreateVisitInput): Promise<Visit> => {
  const shift = await prisma.shift.findUnique({ where: { id: data.shiftId } });

  if (!shift || shift.endDate) {
    throw new Error("Shift is not open");
  }

  return await prisma.visit.create({
    data: { ...data, resultPrice: 0, cash: 0, terminal: 0 },
  });
};

const closeVisit = async (
  id: number,
  data: CloseVisitInput
): Promise<Visit> => {
  const visit = await prisma.visit.findUnique({ where: { id } });

  if (!visit) {
    throw new Error("Visit not found");
  }

  if (visit.endAt) {
    throw new Error("Visit is already closed");
  }

  const calculatedPrice = await calculateVisitPrice({
    ...visit, // TODO: remove visit and just have here necessary info
    endAt: data.endAt,
  });

  if (calculatedPrice !== data.resultPrice) {
    throw new Error("Incorrect price");
  }

  return await prisma.visit.update({
    where: { id },
    data,
  });
};

const getVisits = async (): Promise<Visit[]> => {
  return await prisma.visit.findMany();
};

const getVisitById = async (id: number): Promise<Visit | null> => {
  return await prisma.visit.findUnique({ where: { id } });
};

const updateVisit = async (
  id: number,
  data: CreateVisitInput
): Promise<Visit | null> => {
  const visit = await prisma.visit.findUnique({ where: { id } });
  if (!visit) {
    throw new Error("Visit not found");
  }

  if (visit.endAt !== null) {
    throw new Error("Visit is closed");
  }

  return await prisma.visit.update({ where: { id }, data });
};

const deleteVisit = async (id: number): Promise<Visit | null> => {
  return await prisma.visit.delete({ where: { id } });
};

const calculateVisitPrice = async (visit: Visit): Promise<number> => {
  const shift = await prisma.shift.findUnique({
    where: { id: visit.shiftId },
    include: { location: true },
  });

  if (!shift || !shift.location) {
    throw new Error("Shift or location not found");
  }

  const location = shift.location;
  const durationInHours =
    (new Date(visit.endAt!).getTime() - new Date(visit.startAt).getTime()) /
    (1000 * 60 * 60);
  const totalPrice = Math.max(
    location.priceMinimal,
    durationInHours * location.priceForHour
  );

  return totalPrice;
};

export default {
  createVisit,
  closeVisit,
  getVisits,
  getVisitById,
  updateVisit,
  deleteVisit,
  calculateVisitPrice,
};
