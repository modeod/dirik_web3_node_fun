import { Employee } from "../types/models";
import prisma from "../prisma/client";

interface CreateEmployeeInput {
  fullName: string;
  position: string;
  phone: string;
  email: string;
  homeAdress: string;
  locationId: number;
  salaryFixed: number;
  salarayPercent: number;
  availableSalary: number;
  passportNumber: string;
  INN: string;
}

const createEmployee = async (data: CreateEmployeeInput): Promise<Employee> => {
  return await prisma.employee.create({ data });
};

const getEmployees = async (): Promise<Employee[]> => {
  return await prisma.employee.findMany();
};

const getEmployeeById = async (id: number): Promise<Employee | null> => {
  return await prisma.employee.findUnique({ where: { id } });
};

const updateEmployee = async (
  id: number,
  data: CreateEmployeeInput
): Promise<Employee | null> => {
  return await prisma.employee.update({ where: { id }, data });
};

const deleteEmployee = async (id: number): Promise<Employee | null> => {
  return await prisma.employee.delete({ where: { id } });
};

export default {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
