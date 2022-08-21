import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction {
    originAccount: string;
    targetAccount: string;
    amount: number;
    type: 'transfer' | 'deposit' | 'pix' | 'slip';
}

export interface ITransactionModel extends ITransaction, Document {}

const TransactionSchema: Schema = new Schema(
    {
        originAccount: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        targetAccount: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        amount: { type: String, required: true },
        type: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model<ITransactionModel>('Transaction', TransactionSchema);
