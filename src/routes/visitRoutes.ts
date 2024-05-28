import express from "express";
import {
  createVisit,
  getVisits,
  getVisitById,
  updateVisit,
  deleteVisit,
  closeVisit,
  calculateVisitPrice,
} from "../controllers/visitController";

const router = express.Router();

router.get("/", getVisits);
router.get("/:id", getVisitById);
router.post("/", createVisit);
router.post("/:id/close", closeVisit);
router.put("/:id", updateVisit); // ONLY OPENED VISIT
router.delete("/:id", deleteVisit);
router.post("/calculate-price", calculateVisitPrice);

export default router;
