const express = require('express');

const permission = require('./app/routes/permission.route');
const auth = require('./app/routes/auth.route');
const user = require('./app/routes/user.route');
const patient = require('./app/routes/patient.route');

const router = express.Router();

router.get('/', (_, res) => {
  res.send('Cuidar :)');
});

router.use('/permission', permission);
router.use('/auth', auth);
router.use('/user', user);
router.use('/patient', patient);

module.exports = router;
