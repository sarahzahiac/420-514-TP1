import { Media } from "../models/media.model";
import fs from "fs";
import path from "path";
import { Film } from "../models/film.model";
import { Serie } from "../models/serie.model";

//------------ CHARGEMENT DE JSON ------------//
const dbFile = path.join(__dirname, "../data/db.json");

function loadDB() {
    if (!fs.existsSync(dbFile)) {
        return { film: [], serie: [] };
    }
    const raw = fs.readFileSync(dbFile, "utf-8");
    return JSON.parse(raw);
}

function saveDB(data: any) {
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

export class MediaService {
    private static media: Media[] = [];

    //------------ GET TT LES MEDIAS ------------//
    public static getAllMedia(): Media[] {
        const data = loadDB();

        this.media = [
            ...data.film.map(
                (f: any) =>
                    new Film(
                        f.id,
                        f.title,
                        f.genre,
                        f.year,
                        f.rating,
                        f.duration,
                        f.watched
                    )
            ),
            ...data.serie.map(
                (s: any) =>
                    new Serie(
                        s.id,
                        s.title,
                        s.genre,
                        s.year,
                        s.rating, s.status
                    )
            ),
        ];
        return this.media;
    }

    //------------ GET UN MEDIA PAR ID ------------//
    public static findById(id: string): Media | undefined {
        return this.getAllMedia().find((m) => m.id === id);
    }

    //------------ CREER UN MEDIA ------------//
    public static addMedia(media: Film | Serie): void {
        const data = loadDB();

        if (media instanceof Film) {
            data.film.push({
                id: media.id,
                title: media.title,
                genre: media.genre,
                year: media.year,
                rating: media.rating,
                duration: media.duration,
                watched: media.watched
            });
        } else if (media instanceof Serie) {
            data.serie.push({
                id: media.id,
                title: media.title,
                genre: media.genre,
                year: media.year,
                rating: media.rating,
                status: media.status
            });
        } else {
            throw new Error("The object you're trying to insert is not valid !")
        }

        saveDB(data);
        this.media.push(media)
    }

    //------------ METTRE A JOUR UN MEDIA------------//
    public static updateMedia(id: string, updates: any): Media {
        const data = loadDB();
        let updated: Media | undefined;

        const filmIndex = data.film.findIndex((f: any) => f.id === id);
        if (filmIndex !== -1) {
            data.film[filmIndex] = { ...data.film[filmIndex], ...updates };
            const f = data.film[filmIndex];
            updated = new Film(f.id, f.title, f.genre, f.year, f.rating, f.duration, f.watched);
        } else {
            const serieIndex = data.serie.findIndex((s: any) => s.id === id);
            if (serieIndex !== -1) {
                data.serie[serieIndex] = { ...data.serie[serieIndex], ...updates };
                const s = data.serie[serieIndex];
                updated = new Serie(s.id, s.title, s.genre, s.year, s.rating, s.status, s.season || []);
            }
        }

        if(!updated) throw new Error("Media introuvable");
        saveDB(data);
        return updated;
    }

    //------------ SUPPRIMER UN MEDIA ------------//
    public static deleteMedia(id: string): void {
        const data = loadDB();
        data.film = data.film.filter((f: any) => f.id !== id);
        data.serie = data.serie.filter((s: any) => s.id !== id);

        saveDB(data);

        this.media = this.media.filter((m) => m.id !== id);

    }

}