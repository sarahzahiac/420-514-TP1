import { Media } from "./media.model";

export class User {
    id : string;
    email : string;
    password : string;
    role : "admin" | "user";
    favorites : Media[];

    constructor(id: string, email: string, password: string, role: "admin" | "user" = "user", favorites: Media[] = []) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.favorites = favorites;
    }

    ////------------ AJOUTER UN FAVORIS ------------//
    addFavorite(media : Media): void{
        if(!this.favorites.find((fav) => fav.id === media.id)) {
            this.favorites.push(media);
        }
    }

    //------------ RETIRER UN FAVORIS ------------//
    removeFavorite (mediaId : string): void{
        this.favorites = this.favorites.filter((fav) => fav.id !== mediaId);
    }
}