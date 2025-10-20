import express from "express";
import { SeasonController } from "../controllers/seasonController";
import e from "express";

const router = express.Router();

//http://localhost:3000/api/v2/series/68f5a852c0e0e89f91cdaa14/seasons
router.get("/:seriesId/seasons", SeasonController.getAllSeasonsBySeries);
//
router.post("/:seriesId/seasons", SeasonController.createSeason);

export default router;