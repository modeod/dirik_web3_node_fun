import { Request, Response } from "express";
import visitService from "../services/visitService";
import { Visit } from "../types/models";

export const createVisit = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { shiftId, totemName, clientsAmount, price, isPriceFixed, startAt } =
    req.body;
  try {
    const visit: Visit = await visitService.createVisit({
      shiftId,
      totemName,
      clientsAmount,
      price,
      isPriceFixed,
      startAt,
    });
    res.json(visit);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getVisits = async (req: Request, res: Response): Promise<void> => {
  try {
    const visits: Visit[] = await visitService.getVisits();
    res.json(visits);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getVisitById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const visit: Visit | null = await visitService.getVisitById(parseInt(id));
    if (visit) {
      res.json(visit);
    } else {
      res.status(404).json({ error: "Visit not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const closeVisit = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { endAt, resultPrice, cash, terminal, comment } = req.body;
  try {
    const visit = await visitService.closeVisit(parseInt(id), {
      endAt,
      resultPrice,
      cash,
      terminal,
      comment,
    });
    res.json(visit);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateVisit = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { shiftId, totemName, clientsAmount, price, isPriceFixed, startAt } =
    req.body;
  try {
    const visit: Visit | null = await visitService.updateVisit(parseInt(id), {
      shiftId,
      totemName,
      clientsAmount,
      price,
      isPriceFixed,
      startAt,
    });

    if (visit) {
      res.json(visit);
    } else {
      res.status(404).json({ error: "Visit not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const calculateVisitPrice = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { shiftId, startAt, endAt } = req.body;
  try {
    const visit: Visit = { shiftId, startAt, endAt } as Visit;
    const price = await visitService.calculateVisitPrice(visit);
    res.json({ price });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteVisit = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const visit: Visit | null = await visitService.deleteVisit(parseInt(id));
    if (visit) {
      res.json(visit);
    } else {
      res.status(404).json({ error: "Visit not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
