import express from "express";
import { EpisodeController } from "../controllers/episodeController";

const router = express.Router();

//http://localhost:3000/api/v2/series/68f5a852c0e0e89f91cdaa14/seasons/68f5d501c0e0e89f91cdaa3c/episodes -- {"epNo": 3,"title": "Pilot","durationMin": 51}
router.post("/:seriesId/seasons/:seasonId/episodes", EpisodeController.createEpisode);
//http://localhost:3000/api/v2/series/seasons/68f5d501c0e0e89f91cdaa3c/episodes
router.get("/seasons/:seasonId/episodes", EpisodeController.getEpisodesBySeason);

export default router;