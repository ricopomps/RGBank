import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
    public async createUser(req: Request, res: Response) {
        const response = await UserService.createUser(req.body);
        if (response) return res.status(201).json(response);
        return res.status(500).json({ message: 'Unable to create user' });
    }

    public async readUser(req: Request, res: Response) {
        const { userId } = req.params;

        const response = await UserService.readUser(userId);
        if (response) return res.status(200).json(response);
        return res.status(404).json({ message: 'User not found' });
    }

    public async readAll(req: Request, res: Response) {
        const response = await UserService.readAll();
        if (response) return res.status(200).json(response);
        return res.status(404).json({ message: 'No users found' });
    }

    public async updateUser(req: Request, res: Response) {
        const { userId } = req.params;

        const response = await UserService.updateUser(userId, req.body);
        if (response) return res.status(200).json(response);
        return res.status(404).json({ message: 'User not found' });
    }

    public async deleteUser(req: Request, res: Response) {
        const { userId } = req.params;

        const response = await UserService.deleteUser(userId);
        if (response) return res.status(200).json(response);
        return res.status(404).json({ message: 'User not found' });
    }

    public async login(req: Request, res: Response) {
        const user = req.body;
        const response = await UserService.login(user);
        if (response) return res.status(200).json(response);
        return res.status(404).json({ message: 'User not found' });
    }
}

export default new UserController();
