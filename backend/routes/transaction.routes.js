const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transaction.controller');

router.get('/', TransactionController.index);
router.post('/', TransactionController.store);
router.get('/:uuid', TransactionController.show);
router.put('/:uuid', TransactionController.update);
router.delete('/:uuid', TransactionController.destroy);
router.post('/:uuid/status', TransactionController.status);

module.exports = router;
