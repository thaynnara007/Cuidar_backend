const express = require('express');

const permission = require('./app/routes/permission.route');
const auth = require('./app/routes/auth.route');
const user = require('./app/routes/user.route');
const patient = require('./app/routes/patient.route');
const category = require('./app/routes/category.route');
const activity = require('./app/routes/activity.route');
const step = require('./app/routes/step.route');

const router = express.Router();

router.get('/', (_, res) => {
  res.send('Cuidar :)');
});

router.use('/permission', permission);
router.use('/auth', auth);
router.use('/user', user);
router.use('/patient', patient);
router.use('/category', category);
router.use('/activity', activity);
router.use('/step', step);

module.exports = router;
