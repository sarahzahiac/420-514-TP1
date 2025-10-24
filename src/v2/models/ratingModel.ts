import mongoose, {Schema, Document} from "mongoose";
import sanitizeHtml from "sanitize-html";

export interface IRating extends Document {
    userId: mongoose.Types.ObjectId;
    target: "movie" | "episode";
    targetId: mongoose.Types.ObjectId;
    score: number;
    review?: string;
}

const RatingSchema: Schema = new Schema<IRating>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    target: { type: String, enum: ["movie", "episode"], required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    score: { type: Number, required: true, min: 0, max: 10 },
    review: {type: String, 
        set: (value: string) => sanitizeHtml(value || "", {allowedTags: [], allowedAttributes: {}}),
    }
});

export const RatingModel = mongoose.model<IRating>("Rating", RatingSchema);