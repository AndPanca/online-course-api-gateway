const apiAdapter = require('../../apiAdapter');
const jwt = require('jsonwebtoken');

const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED
} = process.env;

// Declare port URL_SERVICE_USER dengan api adapter
const api = apiAdapter(URL_SERVICE_USER);

// API GATEWAY LOGIN USER
module.exports = async (req, res) => {
  try {
    // Post form data user json dari api-gateway ke url service-user/login untuk di validate
    const user = await api.post('/users/login', req.body);

    // Pada user.data adalah variable axios, data terakhir merupakan data pada response. Simpan data form ke var data
    const data = user.data.data;

    // Generate akses token dan refresh token untuk login
    const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });
    const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED });

    // Simpan refreshToken ke DB. (refresh_token bukan nama tabel, tp nama variable di service-user untuk ambil data dr post)
    await api.post('/refresh_tokens', { refresh_token: refreshToken, user_id: data.id });

    return res.json({
      status: 'success',
      data: {
        // Access token untuk access API end point yang dibuat
        token,
        // Untuk memperbarui access token jika sudah expired
        refresh_token: refreshToken
      }
    });

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