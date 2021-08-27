const express = require('express');
const controller = require('../controllers/permission.controller');
const { verifyAuthorization } = require('../middlewares/auth');
const { CREATE_USER_PERMISSION, WHO_USER } = require('../util/constants');

const router = express.Router();

router.post(
  '/',
  verifyAuthorization(WHO_USER, CREATE_USER_PERMISSION),
  controller.create,
);
router.get(
  '/',
  verifyAuthorization(WHO_USER, CREATE_USER_PERMISSION),
  controller.getAll,
);
router.put(
  '/:id',
  verifyAuthorization(WHO_USER, CREATE_USER_PERMISSION),
  controller.edit,
);
router.delete(
  '/:id',
  verifyAuthorization(WHO_USER, CREATE_USER_PERMISSION),
  controller.delet,
);

module.exports = router;
