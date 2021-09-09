const express = require('express');
const controller = require('../controllers/step.controller');
const { verifyAuthorization } = require('../middlewares/auth');
const multer = require('../../multer')

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
router.get('/activity/:activityId', verifyAuthorization(), controller.getAll);
router.get('/:id', verifyAuthorization(), controller.getById);
router.put(
  '/:id/image',
  verifyAuthorization(WHO_USER, CREATE_ACTIVITY_PERMISSION),
  multer.single('file'),
  controller.addImage,
)
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
