const express = require('express');
const controller = require('../controllers/auth.controller');
const { isValidToken } = require('../middlewares/auth');

const router = express.Router();

router.get('/token/valid', isValidToken);
router.post('/login', controller.login);
router.post('/patient/login', controller.loginPatient);
router.post('/verifyCode', controller.verifyCode);
router.post('/patient/verifyCode', controller.verifyCodePatient);

module.exports = router;
