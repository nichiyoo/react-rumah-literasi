const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');

router.post('/signin', AuthController.login);
router.post('/signup', AuthController.register);
router.post('/signout', AuthController.logout);
router.get('/profile', AuthController.profile);

module.exports = router;
