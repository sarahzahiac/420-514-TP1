import express from "express";
import mediaRoute from "./routes/mediaRoute";
import serieRoute from "./routes/serieRoute";
import userRoute from "./routes/userRoute";
import episodeRoute from "./routes/episodesRoute";
import seasonRoute from "./routes/seasonsRoute";
import { mockAuth, requireAdmin } from "./middlewares/auth";
import { logger, logError } from "./services/logger";

const app = express();
const port = 3000;

app.use(express.json());
app.use(mockAuth)

app.use("/api/media", (req, res, next) => {
    if(["POST", "PUT", "DELETE"].includes(req.method)) {
        return requireAdmin(req, res, next);
    }
    next();
}, mediaRoute);
app.use("/api/series", serieRoute);
app.use("/api/users", userRoute);
app.use("/api/episodes", episodeRoute);
app.use("/api/seasons", seasonRoute);

//------------ GESTION DE 404 ------------//
app.use((req, res) => {
    res.status(404).json({ error: "Introuvable" });
});

//------------ GESTION D'ERREUR ------------//
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logError(err, req.method, req.originalUrl);
    res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});