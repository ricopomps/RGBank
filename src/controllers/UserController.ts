import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
    public async createUser(req: Request, res: Response) {
        const response = await UserService.createUser(req.body);
        return res.status(response.statusCode).json(response.data);
    }

    public async readUser(req: Request, res: Response) {
        const { userId } = req.params;

        const response = await UserService.readUser(userId);
        return res.status(response.statusCode).json(response.data);
    }

    public async readAll(req: Request, res: Response) {
        const response = await UserService.readAll();
        return res.status(response.statusCode).json(response.data);
    }

    public async updateUser(req: Request, res: Response) {
        const { userId } = req.params;

        const response = await UserService.updateUser(userId, req.body);
        return res.status(response.statusCode).json(response.data);
    }

    public async deleteUser(req: Request, res: Response) {
        const { userId } = req.params;

        const response = await UserService.deleteUser(userId);
        return res.status(response.statusCode).json(response.data);
    }

    public async login(req: Request, res: Response) {
        const user = req.body;
        const response = await UserService.login(user);
        return res.status(response.statusCode).json(response.data);
    }
}

export default new UserController();
