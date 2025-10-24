import { Router } from "express";
import { EpisodeController } from "../controllers/episodeController";

const router = Router();

router.post("/", (req, res) => EpisodeController.createEpisode(req, res));
router.patch("/:id", (req, res) => EpisodeController.updateWatched(req, res));

export default router;
