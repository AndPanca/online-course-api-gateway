const apiAdapter = require('../../apiAdapter');

const {
  URL_SERVICE_COURSE
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

// API GATEWAY CREATE CHAPTERS
module.exports = async (req, res) => {
  try {
    // Post data ke url service-course/api/chapters
    const chapter = await api.post('/api/chapters', req.body);
    return res.json(chapter.data);

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