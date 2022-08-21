import express from 'express';
import controller from '../controllers/TransactionController';

const router = express.Router();

router.get('/get/:transactionId', controller.readTransaction);
router.get('/get', controller.readAll);
router.post('/transfer', controller.transfer);

export = router;
