const express = require('express');
const controller = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth.verifyAuthorization('criar usuário'), controller.create);
router.post('/forgetPassword', controller.forgetPassword);

router.get('/:id', auth.verifyAuthorization('ler usuário'), controller.getById);
router.get('/', auth.verifyAuthorization('ler usuário'), controller.getAll);

router.put(
  '/changePassword',
  auth.verifyAuthorization(),
  controller.changePassword,
);
router.put('/:id', auth.verifyAuthorization('criar usuário'), controller.edit);

router.delete(
  '/:id',
  auth.verifyAuthorization('remover usuário'),
  controller.delet,
);

module.exports = router;
