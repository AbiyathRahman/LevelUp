import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User, { UserDocument } from "../models/User";

interface JwtPayload {
    id: string;
}

export interface AuthRequest extends Request {
    user?: UserDocument;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Not authorized, user not found" });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
}