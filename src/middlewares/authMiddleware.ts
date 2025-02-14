import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (role: 'admin' | 'student') => {
    
    return async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) return res.status(401).json({ message: 'Access denied, token missing' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
            
            if (decoded.role !== role) {
                return res.status(403).json({ message: 'Forbidden: Insufficient role' });
            }
            
            req.body.user = decoded;
            
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid or expired token' });
        }
    };
};