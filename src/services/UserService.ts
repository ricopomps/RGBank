import { IUser } from '../models/UserModel';
import UserRepository from '../repositories/UserRepository';

class UserService {
    public async createUser(inputUser: IUser) {
        try {
            const { name, lastName, birthDate, email, phone, cpf } = inputUser;
            const user = { name, lastName, birthDate, email, phone, cpf };
            this.validateUser(user);

            return await UserRepository.createUser(user);
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
}

export default new UserService();
