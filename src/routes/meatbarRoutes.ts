import { Router } from "express";
import { getPeople, getConsumptions, addConsumption, getStreaks } from "../controllers/meatBarControllers";

const router = Router();

router.get('/people', getPeople);
router.get('/consumptions', getConsumptions);
router.post('/consumptions', addConsumption);
router.get('/streaks', getStreaks)

export default router;