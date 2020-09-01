const jwt = require('jsonwebtoken');
const apiAdapter = require('../../apiAdapter');

const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED
} = process.env;

// Declare port URL_SERVICE_USER dengan api adapter
const api = apiAdapter(URL_SERVICE_USER);

// API GATEWAY CREATE REFRESH TOKEN
module.exports = async (req, res) => {
  try {
    // Cek request dari form frontend
    const refreshToken = req.body.refresh_token;
    const email = req.body.email;

    // Cek refreshToken dan email null
    if (!refreshToken || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'invalid token'
      });
    }

    // Cek refreshToken ada atau tidak di DB dengan API /refresh_tokens dari service-user menggunakan api gateway refresh-tokens
    await api.get('/refresh_tokens', { params: { refresh_token: refreshToken } });

    // Verifikasi refreshToken valid dan tidak expired
    jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: 'error',
          message: err.message
        });
      }

      // Memastikan jika mail yang dikirimkan benar2 milik refreshToken, Cek jika email tidak sesuai dengan hasil decode token
      if (email !== decoded.data.email) {
        return res.status(403).json({
          status: 'error',
          message: 'email is not valid'
        });
      }

      // Jika email yg dikirimkan user/frontend sudah benar dengan email JWT refreshToken, maka akan buat token baru
      const token = jwt.sign({ data: decoded.data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });

      // Lempar data token ke frontend agar dapat digunakan token terbaru
      return res.json({
        status: 'succes',
        data: {
          token
        }
      });

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