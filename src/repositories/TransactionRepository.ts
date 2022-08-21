import Transaction, { ITransaction } from '../models/TransactionModel';

class TransactionRepository {
    public async createTransaction(inputTransaction: ITransaction) {
        const transaction = new Transaction(inputTransaction);

        return transaction
            .save()
            .then((transaction) => {
                return { statusCode: 200, data: transaction };
            })
            .catch((error) => {
                return { statusCode: 500, data: error };
            });
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
            })
            .then((transaction) => {
                return transaction ? { statusCode: 200, data: transaction } : { statusCode: 404, data: { message: 'Not found' } };
            })
            .catch((error) => {
                return { statusCode: 500, data: error };
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
            })
            .then((transactions) => {
                return { statusCode: 200, data: transactions };
            })
            .catch((error) => {
                return { statusCode: 500, data: error };
            });
    }

    public async updateTransaction(transactionId: string, inputTransaction: ITransaction) {
        return Transaction.findById(transactionId)
            .then((transaction) => {
                if (transaction) {
                    transaction.set(inputTransaction);

                    return transaction
                        .save()
                        .then((transaction) => {
                            return { statusCode: 200, data: transaction };
                        })
                        .catch((error) => {
                            return { statusCode: 500, data: error };
                        });
                } else {
                    return { statusCode: 500, data: { message: 'not found' } };
                }
            })
            .catch((error) => {
                return { statusCode: 500, data: error };
            });
    }

    public async deleteTransaction(transactionId: string) {
        return Transaction.findByIdAndDelete(transactionId)
            .then((transaction) => {
                return transaction ? { statusCode: 201, data: { message: 'Deleted' } } : { statusCode: 404, data: { message: 'Not found' } };
            })
            .catch((error) => {
                return { statusCode: 500, data: error };
            });
    }

    public async readTransactionByAccount(accountId: string) {
        return await Transaction.find({ $or: [{ originAccount: accountId }, { targetAccount: accountId }] });
    }
}

export default new TransactionRepository();
