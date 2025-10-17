import mongoose from "mongoose";
import config from "config";

export const connectDB = async () => {
  try {
    const uri = config.get<string>("db.uri");
    await mongoose.connect(uri);
    console.log("MongoDB est connecte avec succès");
  } catch (error) {
    console.error("MongoDB n'a pas pue se connecter", error);
    process.exit(1);
  }
};
