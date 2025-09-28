import {Media} from "./media.model";

export class Film extends Media{
    duration : number;
    watched : boolean;

    constructor(id : string, title : string, genre : string, year : number, rating : number, duration : number, watched : boolean = false) {
        super(id, title, genre, year, rating);
        this.duration = duration;
        this.watched = watched;
    }

    getSummary(): string {
        return `${this.title} (${this.year}) - ${this.genre}, durée: ${this.duration} min`;
    }
}