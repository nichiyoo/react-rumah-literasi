const express = require('express');
const router = express.Router();
const EventController = require('../controllers/event.controller');

router.get('/', EventController.index);
router.post('/', EventController.store);
router.get('/:id', EventController.show);
router.put('/:id', EventController.update);
router.delete('/:id', EventController.destroy);

module.exports = router;
