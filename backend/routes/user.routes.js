const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/', UserController.index);
router.post('/', UserController.store);
router.get('/:uuid', UserController.show);
router.put('/:uuid', UserController.update);
router.delete('/:uuid', UserController.destroy);

module.exports = router;
