import { Router } from "express";
import { getPeople } from "../controllers/meatBarControllers";

const router = Router();

router.get('/people', getPeople);

export default router;