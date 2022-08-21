import Payment, { IPayment } from '../models/PaymentModel';

class PaymentRepository {
    public async createPayment(inputPayment: IPayment) {
        const payment = new Payment({
            ...inputPayment
        });

        return payment
            .save()
            .then((payment) => {
                return { statusCode: 200, data: payment };
            })
            .catch((error) => {
                return { statusCode: 500, data: error };
            });
    }

    public async readPayment(paymentId: string) {
        return Payment.findById(paymentId).populate({
            path: 'targetAccount',
            select: '-balance',
            populate: {
                path: 'user',
                select: '-phone'
            }
        });
    }

    public async readAll() {
        return Payment.find().populate({
            path: 'targetAccount',
            select: '-balance',
            populate: {
                path: 'user',
                select: '-phone'
            }
        });
    }

    public async updatePayment(paymentId: string, inputPayment: IPayment) {
        return Payment.findById(paymentId).then((payment) => {
            if (payment) {
                payment.set(inputPayment);

                return payment.save();
            } else {
                return null;
            }
        });
    }

    public async deletePayment(paymentId: string) {
        return Payment.findByIdAndDelete(paymentId);
    }

    public async findPayment(code: string) {
        return await Payment.findOne({ code });
    }
}

export default new PaymentRepository();
