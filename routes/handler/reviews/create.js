const apiAdapter = require('../../apiAdapter');

const {
  URL_SERVICE_COURSE
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

// API GATEWAY CREATE REVIEWS
module.exports = async (req, res) => {
  try {
    // Get data dari token, Jadi harus masuk MIDDLEWARE / verifyToken dulu, jika tidak Error
    const userId = req.user.data.id;

    // Post data ke url service-course/api/reviews
    const review = await api.post('/api/reviews', {
      user_id: userId,
      ...req.body
    });
    return res.json(review.data);

  } catch (error) {
    // Cek koneksi dari api service-course
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: ' service unavailable' });
    }

    // Return jika ada error lain
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
}