import { IAccount } from '../models/AccountModel';
import AccountRepository from '../repositories/AccountRepository';
import { options } from '../routes/UserRoutes';

class AccountService {
    public async createAccount(inputAccount: IAccount) {
        try {
            const { code, type, user } = inputAccount;
            const account = { code, type, user, balance: 0, bank: 'RGBank' };
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

    public async findAccount(account: IAccount) {
        this.validateAccount(account);
        return await AccountRepository.findAccount(account);
    }

    private async addFunds(accountId: string, amount: number) {
        if (amount <= 0) throw new Error('Invalid amount');

        const account = await AccountRepository.findById(accountId);

        if (!account) throw new Error('Account not found');

        account.balance = account.balance + amount;

        return await account.save();
    }

    private async removeFunds(accountId: string, amount: number) {
        if (amount <= 0) throw new Error('Invalid amount');

        const account = await AccountRepository.findById(accountId);

        if (!account) throw new Error('Account not found');

        account.balance = account.balance - amount;

        return await account.save();
    }

    public async transfer(originAccountId: string, targetAccountId: string, amount: number) {
        try {
            if (amount <= 0) throw new Error('Invalid amount');

            const originAccount = await AccountRepository.findById(originAccountId);
            const targetAccount = await AccountRepository.findById(targetAccountId);

            if (!originAccount || !targetAccount) throw new Error('Account not found');

            this.addFunds(targetAccount._id, amount);
            this.removeFunds(originAccount._id, amount);

            return true;
        } catch (error: any) {
            return false;
        }
    }

    private validateAccount(account: IAccount): void {
        const errors: string[] = [];
        (Object.keys(account) as (keyof typeof account)[]).find((key) => {
            if (account[key] === undefined) {
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
