const express = require('express');
const controller = require('../controllers/history.controller');
const { verifyAuthorization } = require('../middlewares/auth');
const {
  WHO_PATIENT,
} = require('../util/constants');

const router = express.Router();

router.post('/', verifyAuthorization(WHO_PATIENT), controller.create)
router.get('/patient/:patientId/activity/:activityId', controller.getAll)

module.exports = router