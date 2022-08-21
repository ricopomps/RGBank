import { NextFunction, Request, Response } from 'express';
import TransactionService from '../services/TransactionService';

class TransactionController {
    public async readTransaction(req: Request, res: Response, next: NextFunction) {
        const { transactionId } = req.params;

        const response = await TransactionService.readTransaction(transactionId);
        return res.status(response.statusCode).json(response.data);
    }

    public async readAll(req: Request, res: Response, next: NextFunction) {
        const response = await TransactionService.readAll();
        return res.status(response.statusCode).json(response.data);
    }
    public async readTransactionByAccount(req: Request, res: Response, next: NextFunction) {
        const { accountId } = req.params;

        const response = await TransactionService.readTransactionByAccount(accountId);
        return res.status(response.statusCode).json(response.data);
    }
    public async transfer(req: Request, res: Response, next: NextFunction) {
        const { originAccount, targetAccount, amount } = req.body;
        const response = await TransactionService.transfer(originAccount, targetAccount, amount);
        return res.status(response.statusCode).json(response.data);
    }

    public async deposit(req: Request, res: Response, next: NextFunction) {
        const { account, amount } = req.body;
        const response = await TransactionService.deposit(account, amount);
        return res.status(response.statusCode).json(response.data);
    }
}

export default new TransactionController();
