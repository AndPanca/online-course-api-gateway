const apiAdapter = require('../../apiAdapter');

const {
  URL_SERVICE_COURSE
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

// API GATEWAY DELETE REVIEWS
module.exports = async (req, res) => {
  try {
    const id = req.params.id; // Get idnya dari params

    // Delete data ke url service-course/api/reviews/id
    const review = await api.delete(`/api/reviews/${id}`);
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