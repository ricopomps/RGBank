import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    name: string;
    lastName: string;
    birthDate: Date;
    email: string;
    phone: number;
    cpf: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        birthDate: { type: Date, required: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true },
        cpf: { type: String, required: true }
    },
    { versionKey: false, timestamps: true }
);

export default mongoose.model<IUserModel>('User', UserSchema);
