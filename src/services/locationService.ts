import { Location } from "../types/models";
import prisma from "../prisma/client";

interface CreateLocationInput {
  name: string;
  adress: string;
  priceMinimal: number;
  priceForHour: number;
}

const createLocation = async (data: CreateLocationInput): Promise<Location> => {
  return await prisma.location.create({ data });
};

const getLocations = async (): Promise<Location[]> => {
  return await prisma.location.findMany();
};

const getLocationById = async (id: number): Promise<Location | null> => {
  return await prisma.location.findUnique({ where: { id } });
};

const updateLocation = async (
  id: number,
  data: CreateLocationInput
): Promise<Location | null> => {
  return await prisma.location.update({ where: { id }, data });
};

const deleteLocation = async (id: number): Promise<Location | null> => {
  return await prisma.location.delete({ where: { id } });
};

export default {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
