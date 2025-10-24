import { MovieModel, IMovie } from "../models/movieModel";

export class MovieService {

    //------------ GET TT LES MOVIES ------------//
    static async getAllMovies(): Promise<IMovie[]> {
        return MovieModel.find();
    }

    //------------ GET UN MOVIE PAR ID ------------//
    static async getMovieById(id: string): Promise<IMovie | null> {
        return MovieModel.findOne({ _id: id });
    }

    //------------ CRÉER UN MOVIE ------------//
    static async createMovie(movieData: Partial<IMovie>): Promise<IMovie> {
        const movie = new MovieModel(movieData);
        return movie.save();
    }

    //------------ UPDATE UN MOVIE PAR ID ------------//
    static async updateMovie(id: string, movieData: Partial<IMovie>): Promise<IMovie | null> {
        return MovieModel.findByIdAndUpdate(id, movieData, { new: true });
    }

    //------------ SUPPRIMER UN MOVIE PAR ID ------------//
    static async deleteMovie(id: string): Promise<IMovie | null> {
        return MovieModel.findByIdAndDelete(id);
    }

}