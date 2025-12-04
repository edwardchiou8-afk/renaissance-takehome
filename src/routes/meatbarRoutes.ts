import { Router } from "express";
import { getPeople, getConsumptions, addConsumption } from "../controllers/meatBarControllers";

const router = Router();

router.get('/people', getPeople);
router.get('/consumptions', getConsumptions);
router.post('/consumptions', addConsumption);

export default router;