import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment {
    type: 'pix' | 'slip';
    targetAccount: string;
    amount: number;
    expireAt: Date;
}
export interface IPaymentModel extends IPayment, Document {}

const PaymentSchema: Schema = new Schema(
    {
        targetAccount: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        type: { type: String, required: true },
        amount: { type: Number, required: true },
        expirteAt: { type: Date, required: true }
    },
    { timestamps: true, expireAfterSeconds: 0 }
);

export default mongoose.model<IPaymentModel>('Payment', PaymentSchema);
