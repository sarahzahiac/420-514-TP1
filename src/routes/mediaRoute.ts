import {Router} from "express";
import { MediaController } from "../controllers/mediaController";

const router = Router();

router.get("/", (req, res) => MediaController.getAllMedia(req, res));
router.get("/:id", (req, res) => MediaController.getById(req, res));
router.post("/", (req, res) => MediaController.createMedia(req, res));
router.put("/:id", (req, res) => MediaController.updateMedia(req, res));
router.delete("/:id", (req, res) => MediaController.deleteMedia(req, res));

export default router;