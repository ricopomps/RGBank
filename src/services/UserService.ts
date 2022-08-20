import mongoose from 'mongoose';
import User, { IUser } from '../models/UserModel';
import UserRepository from '../repositories/UserRepository';

class UserService {
    public async createUser(inputUser: IUser) {
        const { name } = inputUser;

        return await UserRepository.createUser({ name });
    }

    public async readUser(userId: string) {
        return await UserRepository.readUser(userId);
    }

    public async readAll() {
        return await UserRepository.readAll();
    }

    public async updateUser(userId: string, inputUser: IUser) {
        return await UserRepository.updateUser(userId, inputUser);
    }

    public async deleteUser(userId: string) {
        return await UserRepository.deleteUser(userId);
    }
}

export default new UserService();
