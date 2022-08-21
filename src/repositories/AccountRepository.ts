import Account, { IAccount } from '../models/AccountModel';

class AccountRepository {
    public async createAccount(inputAccount: IAccount) {
        const account = new Account(inputAccount);

        return account
            .save()
            .then((account) => {
                return { statusCode: 200, data: account };
            })
            .catch((error) => {
                return { statusCode: 500, data: error };
            });
    }

    public async readAccount(accountId: string) {
        return Account.findById(accountId)
            .populate('user')
            .then((account) => {
                return account ? { statusCode: 200, data: account } : { statusCode: 404, data: { message: 'Not found' } };
            })
            .catch((error) => {
                return { statusCode: 500, data: error };
            });
    }

    public async readAll() {
        return Account.find()
            .populate('user')
            .select('-__v')
            .then((accounts) => {
                return { statusCode: 200, data: accounts };
            })
            .catch((error) => {
                return { statusCode: 500, data: error };
            });
    }

    public async updateAccount(accountId: string, inputAccount: IAccount) {
        return Account.findById(accountId)
            .then((account) => {
                if (account) {
                    account.set(inputAccount);

                    return account
                        .save()
                        .then((account) => {
                            return { statusCode: 200, data: account };
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

    public async deleteAccount(accountId: string) {
        return Account.findByIdAndDelete(accountId)
            .then((account) => {
                return account ? { statusCode: 201, data: { message: 'Deleted' } } : { statusCode: 404, data: { message: 'Not found' } };
            })
            .catch((error) => {
                return { statusCode: 500, data: error };
            });
    }
}

export default new AccountRepository();
