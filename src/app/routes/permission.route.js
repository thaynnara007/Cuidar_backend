const express = require('express');
const controller = require('../controllers/permission.controller');
const { verifyAuthorization } = require('../middlewares/auth');

const router = express.Router();

router.post('/', verifyAuthorization('criar usuário'), controller.create);
router.get('/', verifyAuthorization('criar usuário'), controller.getAll);
router.put('/:id', verifyAuthorization('criar usuário'), controller.edit);
router.delete('/:id', verifyAuthorization('criar usuário'), controller.delet);

module.exports = router;
