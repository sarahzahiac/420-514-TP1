import fs from "fs";
import path from "path";
import { Season } from "../models/season.model";

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

export class SeasonService{
    //------------ GET A SEASON------------//
    public static getSeason(serieId : string): Season[]{
        const data = loadDB();
        const serie = data.serie.find((s: any) => s.id === serieId);
        return serie ? serie.season || [] : [];
    }
    
    //------------ CREATE SEASON ------------//
    public static addSeason(serieId : string, season : Season):void{
        const data = loadDB();
        const serie = data.serie.find((s: any) => s.id === serieId);
        if (!serie) throw new Error("Serie not found");

        serie.season = serie.season || [];
        serie.season.push({
            id: season.id,
            seasonNumber: season.seasonNumber,
            episodes: [],
        })

        saveDB(data);
    }
}