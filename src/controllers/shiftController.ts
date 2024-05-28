import { Request, Response } from "express";
import shiftService from "../services/shiftService";
import { Shift } from "../types/models";

export const createShift = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    creatorId,
    locationId,
    startDate,
    availableCash,
    totalCash,
    totalMoney,
  } = req.body;
  try {
    const shift: Shift = await shiftService.createShift({
      creatorId,
      locationId,
      startDate,
      availableCash,
      totalCash,
      totalMoney,
    });
    res.json(shift);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getShifts = async (req: Request, res: Response): Promise<void> => {
  try {
    const shifts: Shift[] = await shiftService.getShifts();
    res.json(shifts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getShiftById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const shift: Shift | null = await shiftService.getShiftById(parseInt(id));
    if (shift) {
      res.json(shift);
    } else {
      res.status(404).json({ error: "Shift not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const closeShift = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const shift = await shiftService.closeShift(parseInt(id));
    res.json(shift);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteShift = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const shift: Shift | null = await shiftService.deleteShift(parseInt(id));
    if (shift) {
      res.json(shift);
    } else {
      res.status(404).json({ error: "Shift not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
