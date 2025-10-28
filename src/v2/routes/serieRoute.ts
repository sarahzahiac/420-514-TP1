import { Router } from "express";
import { SerieController } from "../controllers/serieController";
import { requireJwt, requireAdmin } from "../middlewares/auth";

const router = Router();

//http://localhost:3000/api/v2/series?title=Breaking Bad&genre=Crime&status=ended
router.get("/", SerieController.getSeries);
//http://localhost:3000/api/v2/series --     {"title": "New", "genres": ["New"],"status": "ongoing" }
router.post("/", requireJwt, requireAdmin, SerieController.createSerie);

export default router;