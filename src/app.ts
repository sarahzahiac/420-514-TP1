import express from "express";
import mediaRoute from "./routes/mediaRoute";
import serieRoute from "./routes/serieRoute";
import userRoute from "./routes/userRoute";
import episodeRoute from "./routes/episodesRoute";
import seasonRoute from "./routes/seasonsRoute";
import { mockAuth, requireAdmin } from "./middlewares/auth";
import { logger, logError } from "./services/logger";
import dotenv from "dotenv";
import { connectDB } from "../config/db";
import mongoose from "mongoose";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(mockAuth)

//------------ IMPLÉMENTATION DE L'AUTHENTIFICATION ADMIN ------------//
app.use("/api/media", (req, res, next) => {
    if(["POST", "PUT", "DELETE"].includes(req.method)) {
        return requireAdmin(req, res, next);
    }
    next();
}, mediaRoute);

//------------ ROUTES ------------//
//app.use("/api/series", serieRoute);
//app.use("/api/users", userRoute);
app.use("/api/episodes", episodeRoute);
app.use("/api/seasons", seasonRoute);

//http://localhost:3000/api/users
const UserSchema = new mongoose.Schema({}, { strict: false });
const UserModel = mongoose.model("users", UserSchema);

app.get("/api/users", async (req, res) => {
  const users = await UserModel.find({});
  res.json(users);
});

//http://localhost:3000/api/films
const FilmSchema = new mongoose.Schema({}, { strict: false });
const FilmModel = mongoose.model("films", FilmSchema);

app.get("/api/films", async (req, res) => {
  const films = await FilmModel.find({});
  res.json(films);
});

//http://localhost:3000/api/series
const SerieSchema = new mongoose.Schema({}, { strict: false });
const SerieModel = mongoose.model("series", SerieSchema);

app.get("/api/series", async (req, res) => {
  const series = await SerieModel.find({});
  res.json(series);
});

//------------ CONFIG SWAGGER ------------//
// Définir les options de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'A simple API to manage users',
    },
  },
  apis: ['./src/routes/*.ts'], // Fichier où les routes de l'API sont définies
};

// Générer la documentation à partir des options
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// http://localhost:3000/api-docs/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//------------ CONNEXION MONGODB ATLAS ------------//
connectDB();

//------------ GESTION DE 404 ------------//
app.use((req, res) => {
    res.status(404).json({ error: "Introuvable" });
});

//------------ GESTION D'ERREUR ------------//
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logError(err, req.method, req.originalUrl);
    res.status(500).json({ error: "Erreur de serveur" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});