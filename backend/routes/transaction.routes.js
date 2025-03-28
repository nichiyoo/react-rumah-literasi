const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transaction.controller');

router.get('/', TransactionController.index);
router.post('/', TransactionController.store);
router.get('/:id', TransactionController.show);
router.put('/:id', TransactionController.update);
router.delete('/:id', TransactionController.destroy);

module.exports = router;
