import mongoose from "mongoose";
import { RatingModel } from "../models/ratingModel";
import { EpisodeModel } from "../models/episodeModel";
import { MovieModel } from "../models/movieModel";
import { SeasonModel } from "../models/seasonModel";

export class RatingService {
    //------------ CRÉER UNE NOTE ------------//
    static async createRating(userId : string, ratingData : { target: "movie" | "episode"; targetId: string; score: number; review?: string }){
        if(ratingData.target === "movie"){
            const movie = await MovieModel.findById(ratingData.targetId);
            if(!movie){
                throw new Error("Film introuvable 😿");
            }
        } else if(ratingData.target === "episode"){
            const episode = await EpisodeModel.findById(ratingData.targetId);
            if(!episode){
                throw new Error("Épisode introuvable 😿");
            }
        } else {
            throw new Error("Cible de notation invalide 😿");
        }

        const existingRating = await RatingModel.findOne({userId, target: ratingData.target, targetId: ratingData.targetId});
        if(existingRating){
            throw new Error("Vous avez déjà noté cette cible 😿");
        }

        const rating = new RatingModel({
            userId,
            target: ratingData.target,
            targetId: ratingData.targetId,
            score: ratingData.score,
            review: ratingData.review
        })

        await rating.save();
        return rating;
    }

    //------------ OBTENIR LA NOTE MOYENNE D'UN FILM ------------//
    static async getMoviesAvgRating(moviesId: string) {
        const ratings = await RatingModel.aggregate([
            { $match: { target: "movie", targetId: new mongoose.Types.ObjectId(moviesId) } },
            { $group: {_id: "$targetId", avgScore: { $avg: "$score" }, count: {$sum : 1} } }
        ]);

        if (ratings.length === 0) return { avgScore: 0, count: 0 };
        return ratings[0];
    }

    //------------ OBTENIR LA NOTE MOYENNE SUR TOUT LES EPISODES ------------//
    static async getSeriesAvgRating(seriesId: string) {
        const episodes = await EpisodeModel.find({seriesId}).select("_id");
        if(!episodes.length) throw new Error("Aucun épisode trouvé pour cette série 😿");

        const episodeIds = episodes.map(ep => ep._id);  

        const ratings = await RatingModel.aggregate([
            { $match: { target: "episode", targetId: { $in: episodeIds } } },
            { $group: {_id: null, avgScore: { $avg: "$score" }, count: {$sum : 1} } }
        ]);

        if (ratings.length === 0) return { avgScore: 0, count: 0 };
        return ratings[0];
    }
}

export default RatingService;