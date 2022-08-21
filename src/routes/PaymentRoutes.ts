import express from 'express';
import controller from '../controllers/PaymentController';

const router = express.Router();

router.post('/create', controller.createPayment);
router.get('/get/:paymentId', controller.readPayment);
router.get('/get', controller.readAll);
router.patch('/update/:paymentId', controller.updatePayment);
router.delete('/delete/:paymentId', controller.deletePayment);
router.post('/create/pix', controller.createPix);

export = router;
