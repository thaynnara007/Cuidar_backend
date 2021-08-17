const express = require('express');
const controller = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', controller.create);
router.post('/forgetPassword', controller.forgetPassword);
router.get('/:id', controller.getById);
router.get('/', controller.getAll);
router.put(
  '/changePassword',
  auth.verifyAuthorization(),
  controller.changePassword,
);
router.put('/:id', controller.edit);
router.delete('/:id', controller.delet);

module.exports = router;
