const apiAdapter = require('../../apiAdapter');

const {
  URL_SERVICE_USER
} = process.env;

// Declare port URL_SERVICE_USER dengan api adapter
const api = apiAdapter(URL_SERVICE_USER);

// API GATEWAY GET USER
module.exports = async (req, res) => {
  try {
    // Get data id token akses dari middlewares/verifyToken decoded
    const id = req.user.data.id

    // Get data user by id dari api-gateway ke url service-user/:id
    const user = await api.get(`/users/${id}`);
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