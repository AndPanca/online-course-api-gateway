const apiAdapter = require('../../apiAdapter');

const {
  URL_SERVICE_USER
} = process.env;

// Declare port URL_SERVICE_USER dengan api adapter
const api = apiAdapter(URL_SERVICE_USER);

// API GATEWAY UPDATE USER
module.exports = async (req, res) => {
  try {
    // Get data id token akses dari middlewares/verifyToken decoded
    const id = req.user.data.id;

    // Put/update data user dari api-gateway ke url service-user/:id dilanjutkan DB
    const user = await api.put(`/users/${id}`, req.body);
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