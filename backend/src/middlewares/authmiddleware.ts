import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    }
}


export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }


        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as unknown as {
            id: string;
            role: string;
        };


        req.user = decoded;


        next();


    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });

    }

};

export const checkRole = (...roles: string[]) => {

    return (
        req: any,
        res: Response,
        next: NextFunction
    ) => {


        if (!roles.includes(req.user.role)) {

            return res.status(403).json({
                error: "You don't have permission"
            });

        }


        next();

    };

};