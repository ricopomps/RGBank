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

    public async transfer(originAccount: IAccount, targetAccount: IAccount, amount: number) {
        try {
            if (amount <= 0) throw new Error('Invalid amount');

            const originAccountModel = await AccountService.findAccount(originAccount);
            if (!originAccountModel) return;
            if (originAccountModel.balance < amount) throw new Error('Insuficient funds');

            const targetAccountModel = await AccountService.findAccount(targetAccount);
            if (!targetAccountModel) return;

            if (await AccountService.transfer(originAccountModel._id, targetAccountModel._id, amount)) {
                const transaction: ITransaction = { originAccount: originAccountModel._id, targetAccount: targetAccountModel._id, amount, type: 'transfer' };
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
