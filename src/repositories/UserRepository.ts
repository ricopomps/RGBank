import mongoose from 'mongoose';
import User, { IUser } from '../models/UserModel';

class UserRepository {
    public async createUser(inputUser: IUser) {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            ...inputUser
        });

        return user.save();
    }

    public async readUser(userId: string) {
        return User.findById(userId);
    }

    public async readAll() {
        return User.find();
    }

    public async updateUser(userId: string, inputUser: IUser) {
        return User.findById(userId).then((user) => {
            if (user) {
                user.set(inputUser);

                return user.save();
            } else {
                return null;
            }
        });
    }

    public async deleteUser(userId: string) {
        return User.findByIdAndDelete(userId);
    }

    public async findExistingUser(email: string, cpf: string) {
        return await User.findOne({
            $or: [{ email, cpf }]
        });
    }

    public async login(cpf: string) {
        return await User.findOne({ cpf }).select('+password').lean();
    }
}

export default new UserRepository();
