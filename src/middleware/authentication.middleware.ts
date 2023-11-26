// auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IAuthRequest } from "../utils/interfaces";

export const authMiddleware = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const secretKey = process.env.AUTH_SECRET_KEY || ""; // Replace with your secret key

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    const decodedBody = decoded as any;

    req.user = {
      username: decodedBody?.username,
      organization_id: decodedBody?.organization_id,
    };

    next();
  });
};
