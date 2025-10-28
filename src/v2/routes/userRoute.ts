import express from "express";
import { UserController } from "../controllers/userController";
import { requireJwt, requireAdmin } from "../middlewares/auth";

const router = express.Router();

//http://localhost:3000/api/v2/users/me -- Authorization: Bearer <token>
router.get("/me", requireJwt,UserController.getMe)
//http://localhost:3000/api/v2/users/me -- Authorization: Bearer <token> -- {"username": "sarahUpdated"}
router.patch("/me", requireJwt,UserController.updateMe);
//http://localhost:3000/api/v2/users/68f5a83ac0e0e89f91cdaa11 -- Authorization: Bearer <token> -- Content-Type: application/json
router.get("/:id", requireJwt, requireAdmin, UserController.getUserById);

export default router;