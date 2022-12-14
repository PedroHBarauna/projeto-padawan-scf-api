/* eslint-disable no-console */
require('./database');
require('dotenv/config');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const swaggerFile = require('../swagger_output.json');

const app = express();
app.use(express.json());

const routes = require('./routes');

app.use(routes);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const AppError = require('./utils/AppError');

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'erro',
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 'erro',
    message: 'Erro interno do servidor',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log('Aplicação rodando');
});
