import express from "express";
import {
  createShift,
  getShifts,
  getShiftById,
  closeShift,
  deleteShift,
} from "../controllers/shiftController";

const router = express.Router();

router.get("/", getShifts);
router.get("/:id", getShiftById);
router.post("/", createShift);
router.post("/:id/close", closeShift);
router.delete("/:id", deleteShift);

export default router;
