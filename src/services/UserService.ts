import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { IUser } from '../models/UserModel';
import UserRepository from '../repositories/UserRepository';
import { config } from '../config/config';
import AccountRepository from '../repositories/AccountRepository';

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

            return await UserRepository.createUser(hashedUser);
        } catch (error) {
            return null;
        }
    }

    public async readUser(userId: string) {
        try {
            return await UserRepository.readUser(userId);
        } catch (error) {
            return null;
        }
    }

    public async readAll() {
        try {
            return await UserRepository.readAll();
        } catch (error) {
            return null;
        }
    }

    public async updateUser(userId: string, user: IUser) {
        try {
            this.validateUser(user);
            return await UserRepository.updateUser(userId, user);
        } catch (error) {
            return null;
        }
    }

    public async deleteUser(userId: string) {
        try {
            return await UserRepository.deleteUser(userId);
        } catch (error) {
            return null;
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
            const message = errors.length === 1 ? `A propriedade '${errors[0]}' ?? obrigat??ria` : `As propriedades '${errors.join(', ')}' s??o obrigat??rias`;

            throw new Error(message);
        }
    }

    public async login(user: { cpf: string; password: string }) {
        try {
            const loggedUser = await UserRepository.login(user.cpf);
            if (user === null || loggedUser === null || !loggedUser.password || !(await bcrypt.compare(user.password, loggedUser.password))) throw new Error('Invalid user');
            const account = await AccountRepository.findAccountByUserId(loggedUser._id);
            const { password, ...secureUser } = loggedUser;
            if (account) {
                const balanceUser = { ...secureUser, balance: account.balance, accountCode: account.code };
                const accessToken = jwt.sign(balanceUser, config.auth.secret);
                return { accessToken, secureUser: { ...balanceUser, id: balanceUser._id } };
            } else {
                const accessToken = jwt.sign(secureUser, config.auth.secret);
                return { accessToken, secureUser: { ...secureUser, id: secureUser._id } };
            }
        } catch (error) {
            return null;
        }
    }
}

export default new UserService();
