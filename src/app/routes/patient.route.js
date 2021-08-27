const express = require('express');
const controller = require('../controllers/patient.controller');
const auth = require('../middlewares/auth');
const {
  CREATE_PATIENT_PERMISSION,
  GET_PATIENT_PERMISSION,
  DELETE_PATIENT_PERMISSION,
  WHO_PATIENT,
  WHO_USER,
} = require('../util/constants');

const router = express.Router();

router.post(
  '/',
  auth.verifyAuthorization(WHO_USER, CREATE_PATIENT_PERMISSION),
  controller.create,
);
router.post('/forgetPassword', controller.forgetPassword);

router.get(
  '/',
  auth.verifyAuthorization(WHO_USER, GET_PATIENT_PERMISSION),
  controller.getAll,
);
router.get('/me', auth.verifyAuthorization(WHO_PATIENT), controller.getByMe);
router.get(
  '/:id',
  auth.verifyAuthorization(WHO_USER, GET_PATIENT_PERMISSION),
  controller.getById,
);

router.put('/me', auth.verifyAuthorization(WHO_PATIENT), controller.edit);
router.put(
  '/changePassword',
  auth.verifyAuthorization(WHO_PATIENT),
  controller.changePassword,
);

router.delete(
  '/:id',
  auth.verifyAuthorization(WHO_USER, DELETE_PATIENT_PERMISSION),
  controller.remove,
);

module.exports = router;
