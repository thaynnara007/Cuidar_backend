const express = require('express');
const controller = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', controller.login);
router.post('/patient/login', controller.loginPatient);
router.post('/verifyCode', controller.verifyCode);

module.exports = router;
