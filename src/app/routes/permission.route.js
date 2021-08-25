const express = require('express');
const controller = require('../controllers/permission.controller');
const { verifyAuthorization } = require('../middlewares/auth');
const { CREATE_USER_PERMISSION } = require('../util/constants');

const router = express.Router();

router.post(
  '/',
  verifyAuthorization(CREATE_USER_PERMISSION),
  controller.create,
);
router.get('/', verifyAuthorization(CREATE_USER_PERMISSION), controller.getAll);
router.put(
  '/:id',
  verifyAuthorization(CREATE_USER_PERMISSION),
  controller.edit,
);
router.delete(
  '/:id',
  verifyAuthorization(CREATE_USER_PERMISSION),
  controller.delet,
);

module.exports = router;
