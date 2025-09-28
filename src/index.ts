// For hot-reload on save during development, use nodemon:
//   npx nodemon src/index.ts
const express = require('express');
const filesRoute = require('./routes/files');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/openapi.json');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(filesRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CDE Transformer listening on port ${PORT}`);
});
