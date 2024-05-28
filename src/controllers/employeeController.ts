import { Request, Response } from "express";
import employeeService from "../services/employeeService";
import { Employee } from "../types/models";

export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    fullName,
    position,
    phone,
    email,
    homeAdress,
    locationId,
    salaryFixed,
    salarayPercent,
    availableSalary,
    passportNumber,
    INN,
  } = req.body;
  try {
    const employee: Employee = await employeeService.createEmployee({
      fullName,
      position,
      phone,
      email,
      homeAdress,
      locationId,
      salaryFixed,
      salarayPercent,
      availableSalary,
      passportNumber,
      INN,
    });
    res.json(employee);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployees = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees: Employee[] = await employeeService.getEmployees();
    res.json(employees);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const employee: Employee | null = await employeeService.getEmployeeById(
      parseInt(id)
    );
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    fullName,
    position,
    phone,
    email,
    homeAdress,
    locationId,
    salaryFixed,
    salarayPercent,
    availableSalary,
    passportNumber,
    INN,
  } = req.body;
  try {
    const employee: Employee | null = await employeeService.updateEmployee(
      parseInt(id),
      {
        fullName,
        position,
        phone,
        email,
        homeAdress,
        locationId,
        salaryFixed,
        salarayPercent,
        availableSalary,
        passportNumber,
        INN,
      }
    );
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const employee: Employee | null = await employeeService.deleteEmployee(
      parseInt(id)
    );
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
