import { NextFunction, Request, Response } from 'express';
import paymentService from '../services/PaymentService';

class PaymentController {
    public async createPayment(req: Request, res: Response, next: NextFunction) {
        const response = await paymentService.createPayment(req.body);
        return res.status(response.statusCode).json(response.data);
    }

    public async readPayment(req: Request, res: Response, next: NextFunction) {
        const { paymentId } = req.params;

        const response = await paymentService.readPayment(paymentId);
        return res.status(response.statusCode).json(response.data);
    }

    public async readAll(req: Request, res: Response, next: NextFunction) {
        const response = await paymentService.readAll();
        return res.status(response.statusCode).json(response.data);
    }

    public async updatePayment(req: Request, res: Response, next: NextFunction) {
        const { paymentId } = req.params;

        const response = await paymentService.updatePayment(paymentId, req.body);
        return res.status(response.statusCode).json(response.data);
    }

    public async deletePayment(req: Request, res: Response, next: NextFunction) {
        const { paymentId } = req.params;

        const response = await paymentService.deletePayment(paymentId);
        return res.status(response.statusCode).json(response.data);
    }
    public async createPix(req: Request, res: Response, next: NextFunction) {
        const response = await paymentService.createPix(req.body);
        return res.status(response.statusCode).json(response.data);
    }
}

export default new PaymentController();
