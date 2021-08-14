const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.post('/', controller.create);
router.get('/:id', controller.getById);
router.get('/', controller.getAll);

module.exports = router;
