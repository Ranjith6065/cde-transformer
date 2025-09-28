const dotenv = require('dotenv');
dotenv.config();

const config = {
  bim360ApiKey: process.env.BIM360_API_KEY,
  procoreToken: process.env.PROCORE_TOKEN,
};

module.exports = { config };
