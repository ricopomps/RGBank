import express from 'express';
import controller from '../controllers/AccountController';

const router = express.Router();

router.post('/create', controller.createAccount);
router.get('/get/:accountId', controller.readAccount);
router.get('/get', controller.readAll);
router.patch('/update/:accountId', controller.updateAccount);
router.delete('/delete/:accountId', controller.deleteAccount);

export = router;
