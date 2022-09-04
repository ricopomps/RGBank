import jwt from 'jsonwebtoken';

import { IUserModel } from '../models/UserModel';
import { IAccount } from '../models/AccountModel';
import { IPayment } from '../models/PaymentModel';
import AccountRepository from '../repositories/AccountRepository';

class AccountService {
    public async createAccount(authHeader: string, inputAccount: IAccount) {
        const token = authHeader.split(' ')[1];
        const user = jwt.decode(token) as IUserModel;
        if (await this.findAccountByUserId(user._id)) throw new Error('User already have an account');

        const { type } = inputAccount;
        const code = await this.getNewCode();
        const account = { code, type, user: user._id, balance: 0, bank: 'RGBank' };
        this.validateAccount(account);

        const createdAccount = AccountRepository.createAccount(account);
        if (!createdAccount) throw new Error('Account not created');
        return createdAccount;
    }

    public async readAccount(accountId: string) {
        try {
            const account = await AccountRepository.readAccount(accountId);
            if (!account) throw new Error('Account not found');
            return account;
        } catch (error) {
            return null;
        }
    }

    public async readAll() {
        try {
            const accounts = await AccountRepository.readAll();
            if (!accounts) throw new Error('No accounts found');
            return accounts;
        } catch (error) {
            return null;
        }
    }

    public async updateAccount(accountId: string, account: IAccount) {
        try {
            const updatedAccount = await AccountRepository.updateAccount(accountId, account);
            if (!updatedAccount) throw new Error('Account not found');
            return updatedAccount;
        } catch (error) {
            return null;
        }
    }

    public async deleteAccount(accountId: string) {
        try {
            const deleteAccount = await AccountRepository.deleteAccount(accountId);
            if (!deleteAccount) throw new Error('Account not found');
            return deleteAccount;
        } catch (error) {
            return null;
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

    private async findAccount(code: number) {
        return await AccountRepository.findAccount(code);
    }

    private async findAccountByUserId(id: string) {
        return await AccountRepository.findAccountByUserId(id);
    }

    private async getNewCode() {
        const account = await AccountRepository.getLastAccount();
        if (!account) return 1;
        return account.code + 1;
    }

    public async transfer(originAccount: IAccount, targetAccount: IAccount, amount: number) {
        try {
            if (amount <= 0) throw new Error('Invalid amount');

            const originAccountModel = await this.findAccount(originAccount.code);
            const targetAccountModel = await this.findAccount(targetAccount.code);

            if (!originAccountModel || !targetAccountModel) throw new Error('Account not found');

            if (originAccountModel.balance < amount) throw new Error('Insuficient balance');

            this.addFunds(targetAccountModel._id, amount);
            this.removeFunds(originAccountModel._id, amount);

            return { originAccountId: originAccountModel._id, targetAccountId: targetAccountModel._id };
        } catch (error) {
            return null;
        }
    }

    public async deposit(account: IAccount, amount: number) {
        try {
            if (amount <= 0) throw new Error('Invalid amount');
            const accountModel = await this.findAccount(account.code);

            if (!accountModel) throw new Error('Account not found');

            this.addFunds(accountModel._id, amount);
            return { accountId: accountModel._id };
        } catch (error) {
            return null;
        }
    }

    public async payment(payment: IPayment, originAccountCode: number) {
        try {
            const originAccount = await this.findAccount(originAccountCode);
            const targetAccount = await this.readAccount(payment.targetAccount);
            if (!originAccount || !targetAccount) throw new Error('Account no found');

            switch (payment.type) {
                case 'pix':
                    this.addFunds(targetAccount._id, payment.amount);
                    this.removeFunds(originAccount._id, payment.amount);
                    break;
                case 'slip':
                    this.removeFunds(originAccount._id, payment.amount);
                    break;

                default:
                    throw new Error('Invalid payment type');
            }

            return { accountId: originAccount._id };
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
