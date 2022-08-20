import { IAccount } from '../models/AccountModel';
import AccountRepository from '../repositories/AccountRepository';

class AccountService {
    public async createAccount(inputAccount: IAccount) {
        try {
            const { balance, bank, code, type, user } = inputAccount;
            const account = { balance, bank, code, type, user };
            this.validateAccount(account);

            return await AccountRepository.createAccount(account);
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    public async readAccount(accountId: string) {
        try {
            return await AccountRepository.readAccount(accountId);
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    public async readAll() {
        try {
            return await AccountRepository.readAll();
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    public async updateAccount(accountId: string, account: IAccount) {
        try {
            this.validateAccount(account);
            return await AccountRepository.updateAccount(accountId, account);
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    public async deleteAccount(accountId: string) {
        try {
            return await AccountRepository.deleteAccount(accountId);
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    private validateAccount(account: IAccount): void {
        const errors: string[] = [];
        (Object.keys(account) as (keyof typeof account)[]).find((key) => {
            if (!account[key]) {
                errors.push(key);
            }
        });

        if (errors.length > 0) {
            const message = errors.length === 1 ? `A propriedade '${errors[0]}' é obrigatória` : `As propriedades '${errors.join(', ')}' são obrigatórias`;

            throw new Error(message);
        }
    }
}

export default new AccountService();
