const express = require('express');
const router = express.Router();
const GiftController = require('../controllers/gift.controller');

router.get('/', GiftController.index);
router.post('/', GiftController.store);
router.get('/:id', GiftController.show);
router.put('/:id', GiftController.update);
router.delete('/:id', GiftController.destroy);

module.exports = router;
