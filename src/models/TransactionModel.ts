import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction {
    originAccount: string;
    targetAccount: string;
    amount: number;
    type: string;
}

export interface ITransactionModel extends ITransaction, Document {}

const TransactionSchema: Schema = new Schema(
    {
        originAccount: { type: String, required: true },
        targetAccount: { type: String, required: true },
        amount: { type: String, required: true },
        type: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model<ITransactionModel>('Transaction', TransactionSchema);
