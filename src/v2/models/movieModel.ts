import mongoose, {Schema, Document} from "mongoose";

export interface IMovie extends Document {
    title: string;
    genres: string [];
    synopsis?: string;
    releaseDate: Date;
    durationMin: number;
}

const MovieSchema: Schema = new Schema<IMovie>({
    title: { type: String, required: true, minlength: 1, maxlength: 200 },
    genres: [{ type: String, required: true, minlength: 1, maxlength: 30 }],
    synopsis: { type: String},
    releaseDate: { type: Date},
    durationMin: { type: Number, required: true, min: 1, max: 600}
});

export const MovieModel = mongoose.model<IMovie>("Movie", MovieSchema);