const express = require('express');
const router = express.Router();
const MerchantController = require('../controllers/merchant.controller');

const { authorize } = require('../middleware/authorize');

const superadmin = authorize();
router.get('/', superadmin, MerchantController.get);
router.put('/', superadmin, MerchantController.update);

module.exports = router;
