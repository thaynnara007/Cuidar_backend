const express = require('express');
const controller = require('../controllers/permission.controller');
const { verifyAuthorization } = require('../middlewares/auth');

const router = express.Router();

router.post('/', verifyAuthorization('create_user'), controller.create);
router.get('/', verifyAuthorization('create_user'), controller.getAll);
router.put('/:id', verifyAuthorization('create_user'), controller.edit);
router.delete('/:id', verifyAuthorization('create_user'), controller.delet);

module.exports = router;
