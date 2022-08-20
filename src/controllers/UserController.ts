import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/UserModel';
import userService from '../services/UserService';

class UserController {
    public async createUser(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;

        const response = await userService.createUser({ name });
        return res.status(response.statusCode).json(response.data);
    }

    public async readUser(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.params;

        const response = await userService.readUser(userId);
        return res.status(response.statusCode).json(response.data);
    }

    public async readAll(req: Request, res: Response, next: NextFunction) {
        const response = await userService.readAll();
        return res.status(response.statusCode).json(response.data);
    }

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.params;

        const response = await userService.updateUser(userId, req.body);
        return res.status(response.statusCode).json(response.data);
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.params;

        const response = await userService.deleteUser(userId);
        return res.status(response.statusCode).json(response.data);
    }
}

export default new UserController();
