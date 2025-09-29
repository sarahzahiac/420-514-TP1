import fs from "fs";
import path from "path";
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

export class SerieService {

    //------------ GET ALL SERIE ------------//
    public static getAllSerie(): Serie[] {
        const data = loadDB();
        return data.serie.map(
            (s: any) =>
                new Serie(
                    s.id,
                    s.title,
                    s.genre,
                    s.year,
                    s.rating,
                    s.status,
                    s.season
                )
        );
    }

    //------------ GET A SERIE BY ID ------------//
    public static findById(id: string): Serie | undefined {
        return this.getAllSerie().find((s) => s.id === id);
    }

    //------------ CREATE SERIE ------------//
    public static addSerie(serie: Serie): void {
        const data = loadDB();

        data.serie.push({
            id: serie.id,
            title: serie.title,
            genre: serie.genre,
            year: serie.year,
            rating: serie.rating,
            status: serie.status,
            season: []
        });
        saveDB(data);
    }

    //------------ DELETE SERIE ------------//
    public static deleteSerie(id : string): void{
        const data = loadDB();
        data.serie = data.serie.filter((s:any) => s.id !== id);
       
        saveDB(data);
    }

}