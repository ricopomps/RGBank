import { NextFunction, Request, Response } from 'express';
import TransactionService from '../services/TransactionService';

class TransactionController {
    public async readTransaction(req: Request, res: Response, next: NextFunction) {
        const { transactionId } = req.params;

        const response = await TransactionService.readTransaction(transactionId);
        if (response) return res.status(200).json(response);
        return res.status(404).json({ message: 'Transaction not found' });
    }

    public async readAll(req: Request, res: Response, next: NextFunction) {
        const response = await TransactionService.readAll();
        if (response) return res.status(200).json(response);
        return res.status(404).json({ message: 'No transactions found' });
    }
    public async readTransactionByAccount(req: Request, res: Response, next: NextFunction) {
        const { accountId } = req.params;

        const response = await TransactionService.readTransactionByAccount(accountId);
        if (response) return res.status(200).json(response);
        return res.status(404).json({ message: 'No transactions found' });
    }
    public async transfer(req: Request, res: Response, next: NextFunction) {
        const { originAccount, targetAccount, amount } = req.body;
        const response = await TransactionService.transfer(originAccount, targetAccount, amount);
        if (response) return res.status(200).json(response);
        return res.status(500).json({ message: 'Unable to transfer' });
    }

    public async deposit(req: Request, res: Response, next: NextFunction) {
        const { account, amount } = req.body;
        const response = await TransactionService.deposit(account, amount);
        if (response) return res.status(200).json(response);
        return res.status(500).json({ message: 'Unable to deposit' });
    }

    public async payment(req: Request, res: Response, next: NextFunction) {
        const { paymentCode, originAccountCode } = req.body;
        const response = await TransactionService.payment(paymentCode, originAccountCode);
        if (response) return res.status(200).json(response);
        return res.status(500).json({ message: 'Unable to perform payment' });
    }
}

export default new TransactionController();
