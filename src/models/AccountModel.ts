import mongoose, { Document, Schema, Types } from 'mongoose';
export interface IAccount {
    user: Types.ObjectId;
    balance: number;
    type: 'checking account' | 'savings account';
    code: number;
    bank: string;
}

export interface IAccountModel extends IAccount, Document {}

const AccountSchema: Schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        balance: { type: Number, required: true },
        type: { type: String, required: true },
        code: { type: Number, required: true },
        bank: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model<IAccountModel>('Account', AccountSchema);
