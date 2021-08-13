const express = require('express');
const controller = require('../controllers/permission.controller');

const router = express.Router();

router.post('/', controller.create);

module.exports = router;
