const express = require('express');
const router = express.Router();

const BookController = require('../controllers/book.controller');

const { upload } = require('../middleware/upload');
const { authorize } = require('../middleware/authorize');

const admin = authorize('admin');

router.get('/', BookController.index);
router.post('/', admin, upload.single('cover[]'), BookController.store);
router.get('/:id', admin, BookController.show);
router.put('/:id', admin, upload.single('cover[]'), BookController.update);
router.delete('/:id', admin, BookController.destroy);

module.exports = router;
