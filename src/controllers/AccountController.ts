import { NextFunction, Request, Response } from 'express';
import AccountService from '../services/AccountService';

class AccountController {
    public async createAccount(req: Request, res: Response, next: NextFunction) {
        const response = await AccountService.createAccount(req.body);
        return res.status(response.statusCode).json(response.data);
    }

    public async readAccount(req: Request, res: Response, next: NextFunction) {
        const { accountId } = req.params;

        const response = await AccountService.readAccount(accountId);
        return res.status(response.statusCode).json(response.data);
    }

    public async readAll(req: Request, res: Response, next: NextFunction) {
        const response = await AccountService.readAll();
        return res.status(response.statusCode).json(response.data);
    }

    public async updateAccount(req: Request, res: Response, next: NextFunction) {
        const { accountId } = req.params;

        const response = await AccountService.updateAccount(accountId, req.body);
        return res.status(response.statusCode).json(response.data);
    }

    public async deleteAccount(req: Request, res: Response, next: NextFunction) {
        const { accountId } = req.params;

        const response = await AccountService.deleteAccount(accountId);
        return res.status(response.statusCode).json(response.data);
    }
}

export default new AccountController();
