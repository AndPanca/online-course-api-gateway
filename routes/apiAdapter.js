const axios = require('axios');

// Parsing data dotenv (karena bukan Integer tp String)
const { TIMEOUT } = process.env;

// Initialisasi base url yang akan digunakan
module.exports = (baseUrl) => {
  return axios.create({
    baseURL: baseUrl,
    timeout: parseInt(TIMEOUT)
  });
}