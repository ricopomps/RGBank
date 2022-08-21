import { NextFunction, Request, Response } from 'express';
import transactionService from '../services/TransactionService';

class TransactionController {
    public async readTransaction(req: Request, res: Response, next: NextFunction) {
        const { transactionId } = req.params;

        const response = await transactionService.readTransaction(transactionId);
        return res.status(response.statusCode).json(response.data);
    }

    public async readAll(req: Request, res: Response, next: NextFunction) {
        const response = await transactionService.readAll();
        return res.status(response.statusCode).json(response.data);
    }

    public async transfer(req: Request, res: Response, next: NextFunction) {
        const { originAccount, targetAccount, amount } = req.body;
        const response = await transactionService.transfer(originAccount, targetAccount, amount);
        return res.status(response.statusCode).json(response.data);
    }

    public async deposit(req: Request, res: Response, next: NextFunction) {
        const { account, amount } = req.body;
        const response = await transactionService.deposit(account, amount);
        return res.status(response.statusCode).json(response.data);
    }
}

export default new TransactionController();
