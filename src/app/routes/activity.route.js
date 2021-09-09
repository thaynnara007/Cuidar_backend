const express = require('express');
const controller = require('../controllers/activity.controller');
const { verifyAuthorization } = require('../middlewares/auth');
const {
  CREATE_ACTIVITY_PERMISSION,
  DELETE_ACTIVITY_PERMISSION,
  WHO_USER,
} = require('../util/constants');

const router = express.Router();

router.post(
  '/',
  verifyAuthorization(WHO_USER, CREATE_ACTIVITY_PERMISSION),
  controller.create,
);
router.get('/', verifyAuthorization(), controller.getAll);
router.get('/:id', verifyAuthorization(), controller.getById);
router.put(
  '/:id',
  verifyAuthorization(WHO_USER, CREATE_ACTIVITY_PERMISSION),
  controller.edit,
);
router.delete(
  '/:id',
  verifyAuthorization(WHO_USER, DELETE_ACTIVITY_PERMISSION),
  controller.remove,
);

module.exports = router;
