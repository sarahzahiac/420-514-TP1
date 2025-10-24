import express from "express";
import { RatingController } from "../controllers/ratingController";
import { requireJwt } from "../middlewares/auth";

const router = express.Router();

router.post("/", requireJwt, RatingController.createRating);
//http://localhost:3000/api/v2/ratings/movies/68f5a14ac0e0e89f91cdaa0d/average
router.get("/movies/:movieId/average", RatingController.getMoviesAvgRating);
//http://localhost:3000/api/v2/ratings/series/68f5a852c0e0e89f91cdaa14/average
router.get("/series/:seriesId/average", RatingController.getSeriesAvgRating);

export default router;