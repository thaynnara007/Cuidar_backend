require('dotenv').config();

const LogService = require('./app/services/log.service');

const environment = require('./config/environment');

const { PORT } = environment;

const app = require('./app');

app.listen(PORT, () => {
  LogService.log(`API rodando na porta ${PORT}`);
});
