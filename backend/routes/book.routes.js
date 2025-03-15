const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const BookController = require('../controllers/book.controller');

router.get('/', BookController.index);
router.post('/', upload.single('cover[]'), BookController.store);
router.get('/:id', BookController.show);
router.put('/:id', upload.single('cover[]'), BookController.update);
router.delete('/:id', BookController.destroy);

module.exports = router;
