const express = require('express');
const router = express.Router();
const EventController = require('../controllers/event.controller');

const { ROLES } = require('../libs/constant');
const { authorize } = require('../middleware/authorize');
const admin = authorize([ROLES.ADMIN]);

router.get('/', admin, EventController.index);
router.post('/', admin, EventController.store);
router.get('/:id', admin, EventController.show);
router.put('/:id', admin, EventController.update);
router.delete('/:id', admin, EventController.destroy);

module.exports = router;
