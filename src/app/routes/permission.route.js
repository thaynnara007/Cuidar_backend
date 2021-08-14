const express = require('express');
const controller = require('../controllers/permission.controller');

const router = express.Router();

router.post('/', controller.create);
router.get('/', controller.getAll);
router.put('/:id', controller.edit);
router.delete('/:id', controller.delet);

module.exports = router;