import { NextFunction, Request, Response } from 'express';
import AccountService from '../services/AccountService';

class AccountController {
    public async createAccount(req: Request, res: Response, next: NextFunction) {
        const response = await AccountService.createAccount(req.body);
        if (response) return res.status(201).json(response);
        return res.status(500).json({ message: 'Unable to create account' });
    }

    public async readAccount(req: Request, res: Response, next: NextFunction) {
        const { accountId } = req.params;

        const response = await AccountService.readAccount(accountId);
        if (response) return res.status(200).json(response);
        return res.status(404).json({ message: 'Account not found' });
    }

    public async readAll(req: Request, res: Response, next: NextFunction) {
        const response = await AccountService.readAll();
        if (response) return res.status(200).json(response);
        return res.status(404).json({ message: 'No accounts found' });
    }

    public async updateAccount(req: Request, res: Response, next: NextFunction) {
        const { accountId } = req.params;

        const response = await AccountService.updateAccount(accountId, req.body);
        if (response) return res.status(200).json(response);
        return res.status(404).json({ message: 'Account not found' });
    }

    public async deleteAccount(req: Request, res: Response, next: NextFunction) {
        const { accountId } = req.params;

        const response = await AccountService.deleteAccount(accountId);
        if (response) return res.status(200).json(response);
        return res.status(404).json({ message: 'Account not found' });
    }
}

export default new AccountController();
