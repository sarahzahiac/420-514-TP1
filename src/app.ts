import express from "express";
import { logger, logError } from "./v2/services/logger";
import dotenv from "dotenv";
import { connectDB } from "../config/db";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
// import swagger_v1 from '../docs/swagger_v1.json';
import swaggerV1 from '../docs/swagger-v1.json';
import swaggerV2 from '../docs/swagger-v2.json';
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import config from 'config';



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

//------------ RATE LIMITNG ------------//
const rateConfig = config.get<{
  windowMs: number;
  max: number;
}>("security.rateLimit");
 
const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: rateConfig.windowMs,
  max: rateConfig.max,
  message: "Trop de requêtes, réessayez plus tard.",
});
 
app.use("/api/v2/auth/login", limiter);
app.use("/api/v2/ratings", limiter);

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
app.use("/docs/v1",
  swaggerUi.serveFiles(swaggerV1),
  swaggerUi.setup(swaggerV1,
  {
    customSiteTitle: "API V1 Documentation Deprecated",
  })
);

app.use("/docs/v2",
  swaggerUi.serveFiles(swaggerV2),
  swaggerUi.setup(swaggerV2,
  {
    customSiteTitle: "API V2 Documentation",
  })
);


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

export default app;