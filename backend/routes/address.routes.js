const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/address.controller');

const { ROLES } = require('../libs/constant');
const { authorize } = require('../middleware/authorize');

const guest = authorize([ROLES.GUEST]);
router.get('/', guest, AddressController.index);
router.post('/', guest, AddressController.store);
router.get('/:id', guest, AddressController.show);
router.put('/:id', guest, AddressController.update);
router.delete('/:id', guest, AddressController.destroy);
router.patch('/:id/default', guest, AddressController.setDefault);

module.exports = router;
