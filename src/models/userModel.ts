import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    email : string;
    nom: string;
    username: string;
    password: string;
    role: "user" | "admin";
    favorites?: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema<IUser>({
    email : { type: String, required: true, unique: true, regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    nom: { type: String, required: true, regex: /^[A-Za-z\s]+$/ },
    username: { type: String, required: true, unique: true, minlength: 3, maxlength: 30, regex: /^[a-zA-Z0-9._-]+$/ },
    password: { type: String, required: true},
    role: { type: String, enum: ["user", "admin"], default: "user" },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Movies" }]
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);