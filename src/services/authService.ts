import { UserModel, IUser } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {

  //------------ REGISTER ------------//
  static async register(data: { email: string; nom: string; username: string; password: string }): Promise<Partial<IUser>> {
    const { email, nom, username, password } = data;

    // vérifier si email ou username existent
    const exists = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (exists) throw new Error("Email ou username déjà utilisé 😿");

    // hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      email,
      nom,
      username,
      password: hashedPassword
    });

    await user.save();

    // ne retourne pas le mot de passe
    const { password: _p, ...rest } = user.toObject();
    return rest;
  }

  //------------ LOGIN ------------//
  static async login(email: string, password: string): Promise<{ token: string }> {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Utilisateur non trouvé 😿");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Mot de passe incorrect 😿");

    // créer un token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return { token };
  }
}
