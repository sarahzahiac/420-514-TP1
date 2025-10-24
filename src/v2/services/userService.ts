import { UserModel, IUser } from "../models/userModel";

export class UserService {

    //------------ GET INFO UTILISATEUR CONNECTÉ ------------//
    static async getMe(userId: string): Promise<Omit<IUser,"password"> | null> {
        const user = await UserModel.findById(userId).select("-password");
        if(!user){
            throw new Error("Utilisateur non trouvé 😿");
        }
        return user;
    }

    //------------ UPDATE INFO UTILISATEUR CONNECTÉ ------------//
    static async updateMe(userId: string, data: Partial<{ username: string; favorites: string[] }>): Promise<Omit<IUser, "password"> | null> {
        const user = await UserModel.findByIdAndUpdate(userId, data, { new: true }).select("-password");
        return user;
    }

    //------------ GET UTILISATEUR PAR ID ------------//
    static async getUserById(userId: string): Promise<Omit<IUser, "password"> | null> {
        const user = await UserModel.findById(userId).select("-password");
        return user;
    }
}