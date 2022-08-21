import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: 'Token is required' });

    const token = authHeader.split(' ')[1];

    try {
        jwt.verify(token, config.auth.secret);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
