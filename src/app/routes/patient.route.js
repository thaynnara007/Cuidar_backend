const express = require('express');
const controller = require('../controllers/patient.controller');
const auth = require('../middlewares/auth');
const {
  CREATE_PATIENT_PERMISSION,
  GET_PATIENT_PERMISSION,
  DELETE_PATIENT_PERMISSION,
} = require('../util/constants');

const router = express.Router();

router.post(
  '/',
  auth.verifyAuthorization(CREATE_PATIENT_PERMISSION),
  controller.create
);
router.get(
  '/',
  auth.verifyAuthorization(GET_PATIENT_PERMISSION),
  controller.getAll
);
router.get('/me', auth.verifyAuthorization(), controller.getByMe);
router.get(
  '/:id',
  auth.verifyAuthorization(GET_PATIENT_PERMISSION),
  controller.getById
);
router.put('/me', auth.verifyAuthorization(), controller.edit);
router.delete(
  '/:id',
  auth.verifyAuthorization(DELETE_PATIENT_PERMISSION),
  controller.remove
);

module.exports = router;
