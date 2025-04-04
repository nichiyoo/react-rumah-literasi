const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/authenticate');

router.post('/signin', AuthController.signin);
router.post('/signup', AuthController.signup);
router.get('/verify', AuthController.verify);
router.post('/signout', AuthController.signout);
router.post('/validate', AuthController.validate);
router.get('/profile', authenticate, AuthController.profile);

module.exports = router;
