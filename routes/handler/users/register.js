const apiAdapter = require('../../apiAdapter');

const {
  URL_SERVICE_USER
} = process.env;

// Declare port URL_SERVICE_USER dengan api adapter
const api = apiAdapter(URL_SERVICE_USER);

// API GATEWAY CREATE USER
module.exports = async (req, res) => {
  try {
    // Post data CREATE user json dari api-gateway ke url service-user/register dilanjutkan ke DB
    const user = await api.post('/users/register', req.body);
    return res.json(user.data);

  } catch (error) {
    // Cek koneksi dari api service-media
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: ' service unavailable' });
    }

    // Return jika ada error lain
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
}