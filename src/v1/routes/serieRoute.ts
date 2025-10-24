import { Router } from "express";
import { SerieController } from "../controllers/serieController";
import { SerieService } from "../services/serieService";


const router = Router();

router.get("/", (req, res) => SerieController.getAllSerie(req, res));
router.get("/:id", (req, res) => SerieController.getById(req, res));
router.post("/", (req, res) => SerieController.createSerie(req, res));
router.delete("/:id", (req, res) => SerieController.deleteSerie(req, res));
router.get("/:id/episodes", (req, res) => {
    const {id} = req.params;
    const serie = SerieService.findById(id);
    if(!serie) return res.status(404).json({error : "Série introuvable"});
    const episodes = (serie.season || []).flatMap((se : any) => se.episodes || []);
    res.json(episodes);
})

export default router;