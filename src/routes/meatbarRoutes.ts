import { Router } from "express";
import { getPeople, getConsumptions, addConsumption, getStreaks, getMonthPeak } from "../controllers/meatBarControllers";

const router = Router();

router.get('/people', getPeople);
router.get('/consumptions', getConsumptions);
router.post('/consumptions', addConsumption);
router.get('/streaks', getStreaks);
router.get('/month-peak', getMonthPeak);

export default router;