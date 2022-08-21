import Transaction, { ITransaction } from '../models/TransactionModel';

class TransactionRepository {
    public async createTransaction(inputTransaction: ITransaction) {
        const transaction = new Transaction(inputTransaction);

        return transaction.save();
    }

    public async readTransaction(transactionId: string) {
        return Transaction.findById(transactionId)
            .populate({
                path: 'originAccount',
                select: ['-balance', '-__v,', '-createdAt', '-updatedAt', '-type']
            })
            .populate({
                path: 'targetAccount',
                select: ['-balance', '-__v,', '-createdAt', '-updatedAt', '-type']
            });
    }

    public async readAll() {
        return Transaction.find()
            .populate({
                path: 'originAccount',
                select: ['-balance', '-__v,', '-createdAt', '-updatedAt', '-type']
            })
            .populate({
                path: 'targetAccount',
                select: ['-balance', '-__v,', '-createdAt', '-updatedAt', '-type']
            });
    }

    public async updateTransaction(transactionId: string, inputTransaction: ITransaction) {
        return Transaction.findById(transactionId).then((transaction) => {
            if (transaction) {
                transaction.set(inputTransaction);

                return transaction.save();
            } else {
                return null;
            }
        });
    }

    public async deleteTransaction(transactionId: string) {
        return Transaction.findByIdAndDelete(transactionId);
    }

    public async readTransactionByAccount(accountId: string) {
        return await Transaction.find({ $or: [{ originAccount: accountId }, { targetAccount: accountId }] });
    }
}

export default new TransactionRepository();
