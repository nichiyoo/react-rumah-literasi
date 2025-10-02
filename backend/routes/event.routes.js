const express = require('express');
const router = express.Router();

const EventController = require('../controllers/event.controller');
const { upload: local } = require('../middleware/local-upload');
const { upload: vercel } = require('../middleware/vercel-blob');

const { ROLES } = require('../libs/constant');
const { authorize } = require('../middleware/authorize');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const upload = IS_PRODUCTION ? vercel : local;

const librarian = authorize([ROLES.LIBRARIAN]);
router.get('/', EventController.index);
router.post('/', librarian, upload.single('media[]'), EventController.store);
router.get('/:id', librarian, EventController.show);
router.put('/:id', librarian, upload.single('media[]'), EventController.update);
router.delete('/:id', librarian, EventController.destroy);

module.exports = router;
