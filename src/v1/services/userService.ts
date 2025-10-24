import fs from "fs";
import path from "path";
import { User } from "../models/user.model";
import { MediaService } from "./mediaService";
import { Media } from "../models/media.model";

//------------ CHARGEMENT DE JSON ------------//
const dbFile = path.join(__dirname, "../data/db.json")

function loadDB(){
    if(!fs.existsSync(dbFile)){
        return {user : [], film : [], serie : []};
    }
    const raw = fs.readFileSync(dbFile, "utf-8");
    return JSON.parse(raw);
}

export class UserService {

    //------------ GET TT LES UTILISATEURS ------------//
    public static getAllUsers() : User[]{
        const data = loadDB();
        return data.user.map((u:any) => new User (String(u.id), u.nom || u.email || "", "", u.role === "admin" ? "admin" : "user", []))
    }

    ////------------ GET UN UTILISATEUR PAR ID ------------//
    public static findById(id : string) : User | undefined {
        return this.getAllUsers().find((u) => u.id === id);
    }

    ////------------ MEDIA D'UN UTILISATEURS ------------//
    public static getUserMedias(userId : string) : Media[] {
        const data = loadDB();
        const all = MediaService.getAllMedia();
        return all.filter((m : any) => String(m.userId) === String(userId));
    }
}