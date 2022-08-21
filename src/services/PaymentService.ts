import crypto from 'crypto';

import { IPayment } from '../models/PaymentModel';
import PaymentRepository from '../repositories/PaymentRepository';

class PaymentService {
    public async createPayment(inputPayment: IPayment) {
        try {
            this.validatePayment(inputPayment);

            return await PaymentRepository.createPayment(inputPayment);
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    public async readPayment(paymentId: string) {
        try {
            return await PaymentRepository.readPayment(paymentId);
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    public async readAll() {
        try {
            return await PaymentRepository.readAll();
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    public async updatePayment(paymentId: string, payment: IPayment) {
        try {
            this.validatePayment(payment);
            return await PaymentRepository.updatePayment(paymentId, payment);
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    public async deletePayment(paymentId: string) {
        try {
            return await PaymentRepository.deletePayment(paymentId);
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    public async createPix(payment: IPayment) {
        try {
            const { amount, targetAccount } = payment;
            const expireAt = new Date();
            const EXPIRE_TIME_PIX = 30;
            expireAt.setMinutes(expireAt.getMinutes() + EXPIRE_TIME_PIX);
            const pix: IPayment = { amount, targetAccount, type: 'pix', expireAt, code: crypto.randomUUID() };

            console.log(pix);
            this.validatePayment(pix);

            return await PaymentRepository.createPayment(pix);
        } catch (error: any) {
            return { statusCode: 500, data: { message: error?.message } };
        }
    }

    private validatePayment(payment: IPayment): void {
        const errors: string[] = [];
        (Object.keys(payment) as (keyof typeof payment)[]).find((key) => {
            if (!payment[key]) {
                errors.push(key);
            }
        });

        if (errors.length > 0) {
            const message = errors.length === 1 ? `A propriedade '${errors[0]}' é obrigatória` : `As propriedades '${errors.join(', ')}' são obrigatórias`;

            throw new Error(message);
        }
    }
}

export default new PaymentService();
