const express = require('express');
const permission = require('./app/routes/permission.route');

const router = express.Router();

router.get('/', (_, res) => {
  res.send('Cuidar :)');
});

router.use('/permission', permission);

module.exports = router;
