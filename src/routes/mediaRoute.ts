import {Router} from "express";
import { MediaController } from "../controllers/mediaController";

const router = Router();
const controller = new MediaController;

router.get("/", (req, res) => controller.getAllMedia(req, res));
router.get("/:id", (req, res) => controller.getMediaById(req, res));
router.post("/", (req, res) => controller.createMedia(req, res));
router.put("/:id", (req, res) => controller.updateMedia(req, res));
router.delete("/:id", (req, res) => controller.deletmedia(req, res));

export default router;