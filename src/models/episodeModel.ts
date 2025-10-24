import mongoose, {Schema, Document} from "mongoose";

export interface IEpisode extends Document {
    seriesId: mongoose.Types.ObjectId;
    seasonId: mongoose.Types.ObjectId;
    epNo: number;
    title: string;
    durationMin: number;
}

const EpisodeSchema: Schema = new Schema<IEpisode>({
    seriesId: { type: Schema.Types.ObjectId, ref: "Series", required: true },
    seasonId: { type: Schema.Types.ObjectId, ref: "Seasons", required: true },
    epNo: { type: Number, required: true, min: 1 },
    title: { type: String, required: true, minlength: 1, maxlength: 200 },
    durationMin: { type: Number, required: true, min: 1, max: 300}
});

export const EpisodeModel = mongoose.model<IEpisode>("Episode", EpisodeSchema);