import express from 'express';
import controller from '../controllers/TransactionController';

const router = express.Router();

router.get('/get/:transactionId', controller.readTransaction);
router.get('/get/account/:accountId', controller.readTransactionByAccount);
router.get('/get', controller.readAll);
router.post('/transfer', controller.transfer);
router.post('/deposit', controller.deposit);
router.post('/payment', controller.payment);

export = router;
