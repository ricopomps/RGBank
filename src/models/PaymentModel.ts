import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment {
    type: 'pix' | 'slip';
    targetAccount: string;
    amount: number;
    expireAt: Date;
    code: string;
}
export interface IPaymentModel extends IPayment, Document {}

const PaymentSchema: Schema = new Schema(
    {
        targetAccount: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        type: { type: String, required: true },
        code: { type: String, required: true },
        amount: { type: Number, required: true },
        expireAt: { type: Date, required: true, expires: 0 }
    },
    { timestamps: true, expireAfterSeconds: 0 }
);
export default mongoose.model<IPaymentModel>('Payment', PaymentSchema);
