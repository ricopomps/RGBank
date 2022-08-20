import mongoose, { Document, Schema } from 'mongoose';

export interface IAccount {
    user: string;
    balance: number;
    type: 'checking account' | 'savings account';
    code: number;
    bank: string;
}

export interface IAccountModel extends IAccount, Document {}

const AccountSchema: Schema = new Schema(
    {
        user: { type: String, required: true },
        balance: { type: Number, required: true },
        type: { type: String, required: true },
        code: { type: Number, required: true },
        bank: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model<IAccountModel>('Account', AccountSchema);
