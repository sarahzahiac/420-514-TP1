import {Router} from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const controller = new UserController;

router.get("/", (req, res) => controller.getAllUser(req, res));
router.get("/:id/medias", (req, res) => controller.getUserMedia(req, res));

export default router;