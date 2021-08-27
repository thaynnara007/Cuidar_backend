const express = require('express');
const controller = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const {
  CREATE_USER_PERMISSION,
  GET_USER_PERMISSION,
  DELETE_USER_PERMISSION,
  WHO_USER,
} = require('../util/constants');

const router = express.Router();

router.post(
  '/',
  auth.verifyAuthorization(WHO_USER, CREATE_USER_PERMISSION),
  controller.create,
);
router.post('/forgetPassword', controller.forgetPassword);

router.get('/me', auth.verifyAuthorization(WHO_USER), controller.getByMe);
router.get(
  '/:id',
  auth.verifyAuthorization(WHO_USER, GET_USER_PERMISSION),
  controller.getById,
);
router.get(
  '/',
  auth.verifyAuthorization(WHO_USER, GET_USER_PERMISSION),
  controller.getAll,
);

router.put(
  '/changePassword',
  auth.verifyAuthorization(WHO_USER),
  controller.changePassword,
);
router.put('/me', auth.verifyAuthorization(WHO_USER), controller.editMe);
router.put(
  '/:id',
  auth.verifyAuthorization(WHO_USER, CREATE_USER_PERMISSION),
  controller.edit,
);

router.delete(
  '/:id',
  auth.verifyAuthorization(WHO_USER, DELETE_USER_PERMISSION),
  controller.delet,
);

module.exports = router;
