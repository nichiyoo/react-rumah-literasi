const express = require('express');
const router = express.Router();

const TransactionController = require('../controllers/transaction.controller');
const { authorize } = require('../middleware/authorize');

const admin = authorize('admin');

router.get('/', TransactionController.index);
router.post('/', TransactionController.store);
router.get('/:uuid', TransactionController.show);
router.put('/:uuid', admin, TransactionController.update);
router.delete('/:uuid', admin, TransactionController.destroy);
router.post('/:uuid/status', admin, TransactionController.status);

module.exports = router;
