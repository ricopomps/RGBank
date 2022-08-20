import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

class UserController {
    public async createUser(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name
        });

        return user
            .save()
            .then((user) => res.status(201).json({ user }))
            .catch((error) => res.status(500).json({ error }));
    }

    readUser = (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;

        return User.findById(userId)
            .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not found' })))
            .catch((error) => res.status(500).json({ error }));
    };

    public async readAll(req: Request, res: Response, next: NextFunction) {
        return User.find()
            .then((users) => res.status(200).json({ users }))
            .catch((error) => res.status(500).json({ error }));
    }

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.params;

        return User.findById(userId)
            .then((user) => {
                if (user) {
                    user.set(req.body);

                    return user
                        .save()
                        .then((user) => res.status(201).json({ user }))
                        .catch((error) => res.status(500).json({ error }));
                } else {
                    res.status(404).json();
                }
            })
            .catch((error) => res.status(500).json({ error }));
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.params;

        return User.findByIdAndDelete(userId)
            .then((user) => (user ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })))
            .catch((error) => res.status(500).json({ error }));
    }
}

export default new UserController();
