import mongoose, {Schema, Document} from "mongoose";

export interface ISeason extends Document {
    seriesId: mongoose.Types.ObjectId;
    seasonNo: number;
    episodes: number;
}

const SeasonSchema: Schema = new Schema<ISeason>({
    seriesId: { type: Schema.Types.ObjectId, ref: "Series", required: true },
    seasonNo: { type: Number, required: true, min: 1 },
    episodes: { type: Number, required: true, min: 0 }
});

export const SeasonModel = mongoose.model<ISeason>("Season", SeasonSchema);