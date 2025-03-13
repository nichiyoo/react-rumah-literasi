const express = require('express');
const router = express.Router();
const BookController = require('../controllers/book.controller');

router.get('/', BookController.index);
router.post('/', BookController.store);
router.get('/:id', BookController.show);
router.put('/:id', BookController.update);
router.delete('/:id', BookController.destroy);

module.exports = router;
