import express from "express";
import { AuthController } from "../controllers/authController";

const router = express.Router();

//http://localhost:3000/api/v2/auth/register -- {"email": "sarah@test.com","nom": "Sarah", "username": "sarah123","password": "123456"}
router.post("/register", AuthController.register);
//http://localhost:3000/api/v2/auth/login -- {"email": "sarah@test.com","password": "123456"}
router.post("/login", AuthController.login);

export default router;