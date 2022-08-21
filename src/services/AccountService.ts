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

    private async findAccount(account: IAccount) {
        this.validateAccount(account);
        return await AccountRepository.findAccount(account);
    }

    public async transfer(originAccount: IAccount, targetAccount: IAccount, amount: number) {
        try {
            if (amount <= 0) throw new Error('Invalid amount');

            const originAccountModel = await this.findAccount(originAccount);
            const targetAccountModel = await this.findAccount(targetAccount);

            if (!originAccountModel || !targetAccountModel) throw new Error('Account not found');

            if (originAccountModel.balance < amount) throw new Error('Insuficient balance');

            this.addFunds(targetAccountModel._id, amount);
            this.removeFunds(originAccountModel._id, amount);

            return { originAccountId: originAccountModel._id, targetAccountId: targetAccountModel._id };
        } catch (error: any) {
            return null;
        }
    }

    public async deposit(account: IAccount, amount: number) {
        try {
            if (amount <= 0) throw new Error('Invalid amount');
            const accountModel = await this.findAccount(account);

            if (!accountModel) throw new Error('Account not found');

            this.addFunds(accountModel._id, amount);
            return { accountId: accountModel._id };
        } catch (error) {
            return null;
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
            const message = errors.length === 1 ? `The property '${errors[0]}' is required` : `The properties '${errors.join(', ')}' are required`;

            throw new Error(message);
        }
    }
}

export default new AccountService();
