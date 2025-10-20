import express from "express";
import mediaRoute from "./routes/mediaRoute";
import userRoute from "./routes/userRoute";
import episodeRoute from "./routes/episodesRoute";
import seasonRoute from "./routes/seasonsRoute";
import serie from "./routes/serieRoute";
import { mockAuth, requireAdmin } from "./middlewares/auth";
import { logger, logError } from "./services/logger";
import dotenv from "dotenv";
import { connectDB } from "../config/db";
import mongoose from "mongoose";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import movie from "./routes/movieRoute";

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
// app.use("/api/episodes", episodeRoute);
// app.use("/api/seasons", seasonRoute);
app.use("/api/v2/movies", movie);
app.use("/api/v2/series", serie);

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