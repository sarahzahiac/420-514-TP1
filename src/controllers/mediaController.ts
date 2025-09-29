import { Request, Response } from "express";
import { MediaService } from "../services/mediaService";
import { Film } from "../models/film.model";
import { Serie } from "../models/serie.model";
import { error } from "console";


export class MediaController {
    //------------ SEE ALL MEDIA ------------//
    public static getAllMedia(req: Request, res: Response) {
        const media = MediaService.getAllMedia();
        res.json(media);
    }

    //------------ GET A MEDIA BY ID ------------//
    public static getById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Id parameter is required" });
        }

        const media = MediaService.findById(id);
        if (!media) { return res.status(404).json({ error: "Media not found" }); }

        res.json(media);
    }

    //------------ CREATE MEDIA ------------//
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

        MediaService.addMedia(media);
        res.status(201).json(media);
    }

    //------------ DELETE MEDIA ------------//
    public static deleteMedia(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Id parameter is required" });
        }

        MediaService.deleteMedia(id);
        res.status(204).send();
    }


}