const express = require('express');
const router = express.Router();
const GiftController = require('../controllers/gift.controller');

const { authorize } = require('../middleware/authorize');
const admin = authorize('admin');

router.get('/', GiftController.index);
router.post('/', GiftController.store);
router.get('/:id', GiftController.show);
router.put('/:id', admin, GiftController.update);
router.delete('/:id', GiftController.destroy);

module.exports = router;
