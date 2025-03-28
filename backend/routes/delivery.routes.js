const express = require('express');
const router = express.Router();
const DeliveryController = require('../controllers/delivery.controller');

router.post('/couriers', DeliveryController.couriers);

module.exports = router;
