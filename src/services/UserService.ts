import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { IUser } from '../models/UserModel';
import UserRepository from '../repositories/UserRepository';
import { config } from '../config/config';

class UserService {
    public async createUser(inputUser: IUser) {
        try {
            const { name, lastName, birthDate, email, phone, cpf, password } = inputUser;
            const user = { name, lastName, birthDate, email, phone, cpf, password };
            this.validateUser(user);
            if (!user.password) throw new Error('Invalid Password');

            const existingUser = await UserRepository.findExistingUser(email, cpf);

            if (existingUser) throw new Error('User alredy exists');

            const hashedPassword = await bcrypt.hash(user.password, 10);
            const hashedUser = { ...user, password: hashedPassword };

            const createdUser = await UserRepository.createUser(hashedUser);
            this.validateUser(createdUser.data);
            return { statusCode: createdUser.statusCode, data: { message: 'User created' } };
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    public async readUser(userId: string) {
        try {
            return await UserRepository.readUser(userId);
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    public async readAll() {
        try {
            return await UserRepository.readAll();
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    public async updateUser(userId: string, user: IUser) {
        try {
            this.validateUser(user);
            return await UserRepository.updateUser(userId, user);
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    public async deleteUser(userId: string) {
        try {
            return await UserRepository.deleteUser(userId);
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    private validateUser(user: IUser): void {
        const errors: string[] = [];
        const keys = Object.keys(user);
        (Object.keys(user) as (keyof typeof user)[]).find((key) => {
            if (!user[key]) {
                errors.push(key);
            }
        });

        if (errors.length > 0) {
            const message = errors.length === 1 ? `A propriedade '${errors[0]}' é obrigatória` : `As propriedades '${errors.join(', ')}' são obrigatórias`;

            throw new Error(message);
        }
    }

    public async login(user: { cpf: string; password: string }) {
        try {
            const loggedUser = await UserRepository.login(user.cpf);
            if (user === null || loggedUser === null || !loggedUser.password || !bcrypt.compare(user.password, loggedUser.password)) throw new Error('Invalid user');
            const { password, ...secureUser } = loggedUser;
            const accessToken = jwt.sign({ secureUser }, config.auth.secret);

            return { statusCode: 200, data: { accessToken, secureUser } };
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }
}

export default new UserService();
