import crypto from 'crypto';

import { IPayment } from '../models/PaymentModel';
import PaymentRepository from '../repositories/PaymentRepository';

class PaymentService {
    public async createPayment(inputPayment: IPayment) {
        try {
            this.validatePayment(inputPayment);

            return await PaymentRepository.createPayment(inputPayment);
        } catch (error) {
            return null;
        }
    }

    public async readPayment(paymentId: string) {
        try {
            return await PaymentRepository.readPayment(paymentId);
        } catch (error) {
            return null;
        }
    }

    public async readAll() {
        try {
            return await PaymentRepository.readAll();
        } catch (error) {
            return null;
        }
    }

    public async updatePayment(paymentId: string, payment: IPayment) {
        try {
            this.validatePayment(payment);
            return await PaymentRepository.updatePayment(paymentId, payment);
        } catch (error) {
            return null;
        }
    }

    public async deletePayment(paymentId: string) {
        try {
            return await PaymentRepository.deletePayment(paymentId);
        } catch (error) {
            return null;
        }
    }

    public async findPayment(code: string) {
        return await PaymentRepository.findPayment(code);
    }

    public async createPix(payment: IPayment) {
        try {
            const { amount, targetAccount } = payment;
            const expireAt = new Date();
            const EXPIRE_TIME_PIX = 30;
            expireAt.setMinutes(expireAt.getMinutes() + EXPIRE_TIME_PIX);
            const pix: IPayment = { amount, targetAccount, type: 'pix', expireAt, code: crypto.randomUUID() };

            this.validatePayment(pix);

            return await PaymentRepository.createPayment(pix);
        } catch (error) {
            return null;
        }
    }

    public async createSlip(payment: IPayment) {
        try {
            const { amount, targetAccount } = payment;
            const expireAt = new Date();
            const EXPIRE_TIME_SLIP = 60 * 24;
            expireAt.setMinutes(expireAt.getMinutes() + EXPIRE_TIME_SLIP);
            const slip: IPayment = { amount, targetAccount, type: 'slip', expireAt, code: crypto.randomUUID() };

            this.validatePayment(slip);

            return await PaymentRepository.createPayment(slip);
        } catch (error) {
            return null;
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
            const message = errors.length === 1 ? `The property '${errors[0]}' is required` : `The properties '${errors.join(', ')}' are required`;

            throw new Error(message);
        }
    }
}

export default new PaymentService();
