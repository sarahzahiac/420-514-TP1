import { SerieModel, ISerie } from "../models/serieModel";

export class SerieService {

    //------------ GET TT LES SERIES AVEC FILTRES------------//
    static async getSeries(query: any): Promise<ISerie[]> {
        const filter: any = {};
        
        //par titre
        if(query.title && query.title.trim() !== ""){
            filter.title = { $regex: query.title, $options: "i" }; //insensible a la case
        }

        //par genre
        if(query.genre && query.genre.trim() !== ""){
            const genresArray = query.genre.split(',').map((genre: string) => genre.trim());
            filter.genres = { $in: genresArray };
        }

        //par status
        if(query.status && (query.status === "ongoing" || query.status === "ended")){
            filter.status = query.status;
        }

        return SerieModel.find(filter);
    }

    static async createSerie(serieData: Partial<ISerie>): Promise<ISerie> {
        const serie = new SerieModel(serieData);
        return serie.save();
    }
}