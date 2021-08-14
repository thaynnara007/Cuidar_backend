const express = require('express');

const permission = require('./app/routes/permission.route');
const auth = require('./app/routes/auth.route');

const router = express.Router();

router.get('/', (_, res) => {
  res.send('Cuidar :)');
});

router.use('/permission', permission);
router.use('/auth', auth);

module.exports = router;
