import express from "express";
import { UserController } from "../controllers/userController";
import { requireJwt, requireAdmin } from "../middlewares/auth";

const router = express.Router();

router.get("/me", requireJwt,UserController.getMe)
router.patch("/me", requireJwt,UserController.updateMe);
router.get("/:id", requireJwt, requireAdmin,UserController.getUserById);

export default router;