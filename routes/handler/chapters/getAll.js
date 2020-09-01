const apiAdapter = require('../../apiAdapter');

const {
  URL_SERVICE_COURSE
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

// API GATEWAY GET ALL CHAPTERS
module.exports = async (req, res) => {
  try {
    // Get all request data dari url service-course/api/chapters
    const chapters = await api.get('/api/chapters', {
      params: {
        ...req.query
      }
    });
    return res.json(chapters.data);

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