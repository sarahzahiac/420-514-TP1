import mongoose, {Schema, Document} from "mongoose";

export interface ISerie extends Document {
    title: string;
    genres: string [];
    status: "ongoing" | "ended";
}

const SerieSchema: Schema = new Schema<ISerie>({
    title: { type: String, required: true, minlength: 1, maxlength: 200 },
    genres: [{ type: String, required: true, minlength: 1, maxlength: 30 }],
    status: { type: String, enum: ["ongoing", "ended"], required: true }
})

export const SerieModel = mongoose.model<ISerie>("Serie", SerieSchema);