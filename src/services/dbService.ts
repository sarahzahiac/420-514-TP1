import {promises as fs} from "fs";
import path from "path";

const DB_PATH = path.join(__dirname, "..", "data", "db.json");

//------------ LECTURE DU FICHIER ------------//
export async function readDB(){
    const raw = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(raw);
}

//------------ ECRITURE DANS LE FICHIER ------------//
export async function writeDB (data : any){
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}






