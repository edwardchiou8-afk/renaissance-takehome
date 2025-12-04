import { Router } from "express";
import { getPeople, getConsumptions } from "../controllers/meatBarControllers";

const router = Router();

router.get('/people', getPeople);
router.get('/consumptions', getConsumptions);

export default router;