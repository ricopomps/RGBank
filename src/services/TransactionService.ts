import { ITransaction } from '../models/TransactionModel';
import { IAccount } from '../models/AccountModel';
import AccountService from './AccountService';
import TransactionRepository from '../repositories/TransactionRepository';

class TransactionService {
    public async readTransaction(transactionId: string) {
        try {
            return await TransactionRepository.readTransaction(transactionId);
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    public async readAll() {
        try {
            return await TransactionRepository.readAll();
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    public async readTransactionByAccount(accountId: string) {
        try {
            const response = await TransactionRepository.readTransactionByAccount(accountId);
            if (response && response.length > 0) return { statusCode: 200, data: response };
            else return { statusCode: 404, data: { message: 'No transactions' } };
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    public async transfer(originAccount: IAccount, targetAccount: IAccount, amount: number) {
        try {
            if (amount <= 0) throw new Error('Invalid amount');

            const transfer = await AccountService.transfer(originAccount, targetAccount, amount);
            if (transfer) {
                const transaction: ITransaction = { originAccount: transfer.originAccountId, targetAccount: transfer.targetAccountId, amount, type: 'transfer' };
                return await TransactionRepository.createTransaction(transaction);
            } else throw new Error('Error during transaction');
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }
    public async deposit(account: IAccount, amount: number) {
        try {
            if (amount <= 0) throw new Error('Invalid amount');

            const deposit = await AccountService.deposit(account, amount);

            if (deposit) {
                const transaction: ITransaction = { originAccount: deposit.accountId, targetAccount: deposit.accountId, amount, type: 'deposit' };
                return await TransactionRepository.createTransaction(transaction);
            } else {
                throw new Error('Error during transaction');
            }
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }
}

export default new TransactionService();
