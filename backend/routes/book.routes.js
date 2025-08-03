const express = require('express');
const router = express.Router();

const BookController = require('../controllers/book.controller');

const { ROLES } = require('../libs/constant');
const { upload } = require('../middleware/upload');
const { authorize } = require('../middleware/authorize');

const librarian = authorize([ROLES.LIBRARIAN]);
router.get('/', BookController.index);
router.post('/', librarian, upload.single('cover[]'), BookController.store);
router.get('/:id', librarian, BookController.show);
router.put('/:id', librarian, upload.single('cover[]'), BookController.update);
router.delete('/:id', librarian, BookController.destroy);

module.exports = router;
