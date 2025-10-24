import { Router } from "express";
import { SeasonController } from "../controllers/seasonController";

const router = Router();

router.post("/", (req, res) => SeasonController.createSeason(req, res));

export default router;
