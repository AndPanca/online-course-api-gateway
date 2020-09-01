const apiAdapter = require('../../apiAdapter');

const {
  URL_SERVICE_MEDIA
} = process.env;

// Declare port URL_SERVICE_MEDIA dengan api adapter
const api = apiAdapter(URL_SERVICE_MEDIA);

// API GATEWAY CREATE MEDIA
module.exports = async (req, res) => {
  try {
    // Post data media json dari api-gateway ke url service-media/media dilanjutkan database
    const media = await api.post('/media', req.body);
    return res.json(media.data);

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