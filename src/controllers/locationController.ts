import { Request, Response } from "express";
import locationService from "../services/locationService";
import { Location } from "../types/models";

export const createLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, adress, priceMinimal, priceForHour } = req.body;
  try {
    const location: Location = await locationService.createLocation({
      name,
      adress,
      priceMinimal,
      priceForHour,
    });
    res.json(location);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getLocations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const locations: Location[] = await locationService.getLocations();
    res.json(locations);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getLocationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const location: Location | null = await locationService.getLocationById(
      parseInt(id)
    );
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ error: "Location not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, adress, priceMinimal, priceForHour } = req.body;
  try {
    const location: Location | null = await locationService.updateLocation(
      parseInt(id),
      { name, adress, priceMinimal, priceForHour }
    );
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ error: "Location not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const location: Location | null = await locationService.deleteLocation(
      parseInt(id)
    );
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ error: "Location not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
