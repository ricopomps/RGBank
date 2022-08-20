import mongoose from 'mongoose';
import User, { IUser } from '../models/UserModel';

class UserService {
    public async createUser(inputUser: IUser) {
        const { name } = inputUser;

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name
        });

        return user
            .save()
            .then((user) => {
                return { statusCode: 200, data: user };
            })
            .catch((error) => {
                return { statusCode: 500, data: error };
            });
    }

    public async readUser(userId: string) {
        return User.findById(userId)
            .then((user) => {
                return user ? { statusCode: 200, data: user } : { statusCode: 404, data: { message: 'Not found' } };
            })
            .catch((error) => {
                return { statusCode: 500, data: error };
            });
    }

    public async readAll() {
        return User.find()
            .then((users) => {
                return { statusCode: 200, data: users };
            })
            .catch((error) => {
                return { statusCode: 500, data: error };
            });
    }

    public async updateUser(userId: string, inputUser: IUser) {
        return User.findById(userId)
            .then((user) => {
                if (user) {
                    user.set(inputUser);

                    return user
                        .save()
                        .then((user) => {
                            return { statusCode: 200, data: user };
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

    public async deleteUser(userId: string) {
        return User.findByIdAndDelete(userId)
            .then((user) => {
                return user ? { statusCode: 201, data: { message: 'Deleted' } } : { statusCode: 404, data: { message: 'Not found' } };
            })
            .catch((error) => {
                return { statusCode: 500, data: error };
            });
    }
}

export default new UserService();
