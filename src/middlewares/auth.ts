import { Request, Response, NextFunction } from "express";
import { logRequest } from "../services/logger";

export interface AuthUser {
    id: string;
    role: "admin" | "user";
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }   
    }
}

export function mockAuth(req: Request, res: Response, next: NextFunction) {
  const id = req.header("x-user-id") || "anonymous";
  const role = (req.header("x-user-role") as "admin" | "user") || "user";
  req.user = { id, role };
  logRequest(req.method, req.originalUrl, id);
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Privilège administrateur requis" });
    }
    next();
}