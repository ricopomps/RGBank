import { NextFunction, Request, Response } from 'express';
import paymentService from '../services/PaymentService';

class PaymentController {
    public async createPayment(req: Request, res: Response, next: NextFunction) {
        const response = await paymentService.createPayment(req.body);
        if (response) return res.status(201).json(response);
        return res.status(500).json({ message: 'Unable to create payment' });
    }

    public async readPayment(req: Request, res: Response, next: NextFunction) {
        const { paymentId } = req.params;

        const response = await paymentService.readPayment(paymentId);
        if (response) return res.status(201).json(response);
        return res.status(404).json({ message: 'Payment not found' });
    }

    public async readAll(req: Request, res: Response, next: NextFunction) {
        const response = await paymentService.readAll();
        if (response) return res.status(201).json(response);
        return res.status(404).json({ message: 'No Payments found' });
    }

    public async updatePayment(req: Request, res: Response, next: NextFunction) {
        const { paymentId } = req.params;

        const response = await paymentService.updatePayment(paymentId, req.body);
        if (response) return res.status(201).json(response);
        return res.status(404).json({ message: 'Account not found' });
    }

    public async deletePayment(req: Request, res: Response, next: NextFunction) {
        const { paymentId } = req.params;

        const response = await paymentService.deletePayment(paymentId);
        if (response) return res.status(201).json(response);
        return res.status(404).json({ message: 'Account not found' });
    }

    public async createPix(req: Request, res: Response, next: NextFunction) {
        const response = await paymentService.createPix(req.body);
        if (response) return res.status(201).json(response);
        return res.status(500).json({ message: 'Unable to create pix' });
    }

    public async createSlip(req: Request, res: Response, next: NextFunction) {
        const response = await paymentService.createSlip(req.body);
        if (response) return res.status(201).json(response);
        return res.status(500).json({ message: 'Unable to create slip' });
    }
}

export default new PaymentController();
