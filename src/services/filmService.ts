import fs from "fs";
import path from "path";
import { Film } from "../models/film.model";

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

export class FilmService {

    //------------ GET ALL FILM ------------//
    public static getAllFilm(): Film[] {
        const data = loadDB();
        return data.film.map(
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
        );
    }

    //------------ GET A FILM BY ID ------------//
    public static findById(id: string): Film | undefined {
        return this.getAllFilm().find((f) => f.id === id);
    }

    //------------ CREATE FILM ------------//
    public static addFilm(film: Film): void {
        const data = loadDB();

        data.film.push({
            id: film.id,
            title: film.title,
            genre: film.genre,
            year: film.year,
            rating: film.rating,
            duration: film.duration,
            watched: film.watched
        });

        saveDB(data);
    }

    //------------ DELETE FILM ------------//
    public static deleteFilm(id : string): void{
        const data = loadDB();
        data.film = data.film.filter((f:any) => f.id !== id);
       
        saveDB(data);
    }

}