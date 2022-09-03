import Account, { IAccount } from '../models/AccountModel';

class AccountRepository {
    public async createAccount(inputAccount: IAccount) {
        const account = new Account(inputAccount);

        return account.save();
    }

    public async readAccount(accountId: string) {
        return await Account.findById(accountId).populate('user');
    }

    public async readAll() {
        return Account.find().populate('user').select('-__v');
    }

    public async updateAccount(accountId: string, inputAccount: IAccount) {
        return Account.findById(accountId).then((account) => {
            if (account) {
                account.set(inputAccount);

                return account.save().then((account) => {
                    return account;
                });
            } else {
                return null;
            }
        });
    }

    public async deleteAccount(accountId: string) {
        return Account.findByIdAndDelete(accountId);
    }

    public async findById(accountId: string) {
        return await Account.findById(accountId);
    }

    public async findAccountByUserId(id: string) {
        return await Account.findOne({ user: id });
    }

    public async findAccount(code: number) {
        return await Account.findOne({ code });
    }
}

export default new AccountRepository();
