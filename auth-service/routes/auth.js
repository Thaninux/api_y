const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/remind-password', authController.remindPassword);

module.exports = router;
