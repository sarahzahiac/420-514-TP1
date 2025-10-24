import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
    role: "user" | "admin";
}

export const requireJwt = (req: Request & { userId?: string; userRole?: string }, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Token manquant 😿" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Token mal formaté 😿");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as unknown as JwtPayload;
        console.log(decoded.userId);
        console.log(decoded.role);
    } catch (error) {
        return res.status(401).json({ message: "Token invalide😿" });
    }
}

export const requireAdmin = (req: Request & {userRole?: string }, res: Response, next: NextFunction) => {
    if (req.userRole !== "admin") {
        return res.status(403).json({ message: "Privilèges administrateurs requis 😿" });
    }
    next();
}