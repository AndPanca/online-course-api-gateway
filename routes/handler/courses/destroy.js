const apiAdapter = require('../../apiAdapter');

const {
  URL_SERVICE_COURSE
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

// API GATEWAY DELETE MENTOR
module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    // Delete data ke url service-course/api/mentors/:id
    const course = await api.delete(`/api/courses/${id}`);
    return res.json(course.data);

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