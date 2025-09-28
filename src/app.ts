import express from "express";
import mediaRoute from "./routes/mediaRoute"

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/media", mediaRoute);

app.use("/", (req, res) => {
    res.send("Page /");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});