import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserModel } from "../src/v2/models/userModel";
import { MovieModel } from "../src/v2/models/movieModel";
import { SerieModel } from "../src/v2/models/serieModel";
import { SeasonModel } from "../src/v2/models/seasonModel";
import { EpisodeModel } from "../src/v2/models/episodeModel";
import { RatingModel } from "../src/v2/models/ratingModel";
import { connectDB } from "./database";

dotenv.config();

const seed = async () => {
  try {
    console.log("Connexion à MongoDB...");
    await connectDB();

    // -------- VIDER LES COLLECTIONS -------- //
    await Promise.all([
      UserModel.deleteMany({}),
      MovieModel.deleteMany({}),
      SerieModel.deleteMany({}),
      SeasonModel.deleteMany({}),
      EpisodeModel.deleteMany({}),
      RatingModel.deleteMany({})
    ]);
    console.log("Collections vidées.");

    // --- UTILISATEUR ---
    const users = await UserModel.create([
      {
        email: "user1@example.com",
        nom: "Alice Dupont",
        username: "alice",
        password: await bcrypt.hash("Password123!", 10),
        role: "user",
      },
      {
        email: "admin@example.com",
        nom: "Jean Admin",
        username: "admin",
        password: await bcrypt.hash("Admin1234!", 10),
        role: "admin",
      },
      {
        email: "user2@example.com",
        nom: "Karim Lemaire",
        username: "karim",
        password: await bcrypt.hash("Karim123!", 10),
        role: "user",
      },
    ]);
    console.log(`${users.length} utilisateurs insérés.`);

    // --- FILM ---
    const movies = await MovieModel.create([
      {
        title: "Inception",
        genres: ["Sci-Fi", "Thriller"],
        synopsis: "Un voleur infiltre les rêves pour voler des secrets.",
        releaseDate: new Date("2010-07-16"),
        durationMin: 148,
      },
      {
        title: "Interstellar",
        genres: ["Sci-Fi", "Drama"],
        synopsis: "Des explorateurs voyagent à travers un trou de ver pour sauver l’humanité.",
        releaseDate: new Date("2014-11-07"),
        durationMin: 169,
      },
    ]);
    console.log(`${movies.length} films insérés.`);

    // --- SERIES ---
    const series = await SerieModel.create([
      {
        title: "Tech Hunters",
        genres: ["Technology", "Action"],
        status: "ongoing",
      },
      {
        title: "Love City",
        genres: ["Romance", "Drama"],
        status: "ended",
      },
    ]);
    console.log(`${series.length} séries insérées.`);

    // --- SAISON ---
    const seasons = await SeasonModel.create([
      {
        seriesId: series[0]!._id,
        seasonNo: 1,
        episodes: 0,
      },
      {
        seriesId: series[1]!._id,
        seasonNo: 1,
        episodes: 0,
      },
    ]);
    console.log(`${seasons.length} saisons insérées.`);

    // --- EPISODES ---
    const episodes = await EpisodeModel.create([
      {
        seriesId: series[0]!._id,
        seasonId: seasons[0]!._id,
        epNo: 1,
        title: "The Awakening",
        durationMin: 42,
      },
      {
        seriesId: series[1]!._id,
        seasonId: seasons[1]!._id,
        epNo: 1,
        title: "The First Kiss",
        durationMin: 40,
      },
    ]);
    console.log(`${episodes.length} épisodes insérés.`);

    // --- RATINGS ---
    if (users.length < 3 || movies.length < 1 || episodes.length < 2) {
      throw new Error("Données insuffisantes pour insérer des notes 😿");
    }

    await RatingModel.create([
      {
        userId: users[0]!._id,
        target: "movie",
        targetId: movies[0]!._id,
        score: 9,
        review: "Chef-d'œuvre de Nolan !",
      },
      {
        userId: users[2]!._id,
        target: "episode",
        targetId: episodes[1]!._id,
        score: 7,
        review: "Un bon début de série.",
      },
    ]);
    console.log("Notes insérées.");

    console.log("SEED terminé avec succès 😸");
    process.exit(0);
  } catch (err) {
    console.error("Erreur pendant le seed 😿:", err);
    process.exit(1);
  }
};

seed();
