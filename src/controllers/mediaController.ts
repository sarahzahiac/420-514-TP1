import { Request, Response } from "express";
import { MediaService } from "../services/mediaService";
import { Film } from "../models/film.model";
import { Serie } from "../models/serie.model";
import { error } from "console";


export class MediaController {
    
    //------------VOIR TOUT LES MEDIAS ------------//
    public static getAllMedia(req: Request, res: Response) {
        const media = MediaService.getAllMedia();
        res.json(media);
    }

    //------------ GET UN MEDIA PAR ID ------------//
    public static getById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Id parameter is required" });
        }

        const media = MediaService.findById(id);
        if (!media) { return res.status(404).json({ error: "Media not found" }); }

        res.json(media);
    }

    //------------ CREER UN MEDIA ------------//
    public static createMedia(req: Request, res: Response) {
        const { type, ...data } = req.body;


        let media;
        if (type === "film") {
            media = new Film(
                data.id,
                data.title,
                data.genre,
                data.year,
                data.rating,
                data.duration,
                data.watched
            );
        } else if (type === "serie") {
            media = new Serie(
                data.id,
                data.title,
                data.genre,
                data.year,
                data.rating,
                data.status
            );
        } else {
            return res.status(400).json({ error: "This type of media is not valid" })
        }

        //VALIDATION
        if (type === "film" && (!data.title || data.title.trim() === "")) {
            return res.status(400).json({ error: "Le champ title est requis pour un film." });
        }

        const currentYear = new Date().getFullYear();
        if (type === "film" && data.year > currentYear) {
            return res.status(400).json({ error: "Le champ year ne doit pas être supérieur à l'année actuelle." });
        }

        MediaService.addMedia(media);
        res.status(201).json(media);
    }

    //------------ METTRE A JOUR UN MEDIA ------------//
    public static updateMedia(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Id parameter is required" });
        }
        const existing = MediaService.findById(id);
        if(!existing) {return res.status(404).json({error : "Media introuvable"})}

        try {
            const updated = MediaService.updateMedia(id, req.body);
            res.json(updated);
        } catch (e: any) {
            return res.status(400).json({ error: e.message });
        }

    }

    //------------ SUPPRIMIER UN MEDIA ------------//
    public static deleteMedia(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Id parameter is required" });
        }

        MediaService.deleteMedia(id);
        res.status(204).send();
    }
}