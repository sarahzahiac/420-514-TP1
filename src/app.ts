import express from "express";
import { logger, logError } from "./v2/services/logger";
import dotenv from "dotenv";
import { connectDB } from "../config/db";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';


import serieRoute from "./v1/routes/serieRoute";
import userRoute from "./v1/routes/userRoute";
import episodeRoute from "./v1/routes/episodesRoute";
import seasonRoute from "./v1/routes/seasonsRoute";
import mediaRoute from "./v1/routes/mediaRoute";
import { requireAdmin } from "./v1/middlewares/auth";

import movie from "./v2/routes/movieRoute";
import serie from "./v2/routes/serieRoute";
import season from "./v2/routes/seasonsRoute";
import auth from "./v2/routes/authRoutes";
import user from "./v2/routes/userRoute";
import episode from "./v2/routes/episodesRoute";
import rating from "./v2/routes/ratingRoutes";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());


//------------ IMPLÉMENTATION DE L'AUTHENTIFICATION ADMIN POUR V1 ------------//
app.use("/api/media", (req, res, next) => {
    if(["POST", "PUT", "DELETE"].includes(req.method)) {
        return requireAdmin(req, res, next);
    }
    next();
}, mediaRoute);

//------------ ROUTES ------------//
//    v1    //
app.use("/api/v1/series", serieRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/episodes", episodeRoute);
app.use("/api/v1/seasons", seasonRoute);
app.use("/api/v1/media", mediaRoute);

//    v2    //
app.use("/api/v2/movies", movie);
app.use("/api/v2/series", serie);
app.use("/api/v2/series", season);
app.use("/api/v2/auth", auth);
app.use("/api/v2/users", user);
app.use("/api/v2/series", episode);
app.use("/api/v2/ratings", rating);

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
  apis: ['./src/routes/*.ts'], // fichiers ou les routes sont definis
};

// option de generation de la doc
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