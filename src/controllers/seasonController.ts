import { Request, Response } from "express";
import { SeasonService } from "../services/seasonService";

export class SeasonController {
    static createSeason(req: Request, res: Response) {
        const { serieId, season } = req.body;
        if (!serieId || !season) {
            return res.status(400).json({ error: "serieId and season are required" });
        }
        try {
            SeasonService.addSeason(serieId, season);
            res.status(201).json(season);
        } catch (err: any) {
            res.status(404).json({ error: err.message });
        }
    }
}
