const express = require('express');
const controller = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const {
  CREATE_USER_PERMISSION,
  GET_USER_PERMISSION,
  DELETE_USER_PERMISSION,
} = require('../util/constants');

const router = express.Router();

router.post(
  '/',
  auth.verifyAuthorization(CREATE_USER_PERMISSION),
  controller.create,
);
router.post('/forgetPassword', controller.forgetPassword);

router.get('/me', auth.verifyAuthorization(), controller.getByMe);
router.get(
  '/:id',
  auth.verifyAuthorization(GET_USER_PERMISSION),
  controller.getById,
);
router.get(
  '/',
  auth.verifyAuthorization(GET_USER_PERMISSION),
  controller.getAll,
);

router.put(
  '/changePassword',
  auth.verifyAuthorization(),
  controller.changePassword,
);
router.put('/me', auth.verifyAuthorization(), controller.editMe);
router.put(
  '/:id',
  auth.verifyAuthorization(CREATE_USER_PERMISSION),
  controller.edit,
);

router.delete(
  '/:id',
  auth.verifyAuthorization(DELETE_USER_PERMISSION),
  controller.delet,
);

module.exports = router;
