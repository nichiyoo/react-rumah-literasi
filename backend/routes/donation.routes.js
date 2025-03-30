const express = require('express');
const router = express.Router();
const DonationController = require('../controllers/donation.controller');

const { authorize } = require('../middleware/authorize');
const admin = authorize('admin');

router.get('/', DonationController.index);
router.post('/', DonationController.store);
router.get('/:id', DonationController.show);
router.put('/:id', admin, DonationController.update);
router.delete('/:id', DonationController.destroy);

module.exports = router;
