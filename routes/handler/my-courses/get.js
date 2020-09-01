const apiAdapter = require('../../apiAdapter');

const {
  URL_SERVICE_COURSE
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

// API GATEWAY GET MY COURSES
module.exports = async (req, res) => {
  try {
    const userId = req.user.data.id; // Get data dari token

    // Get data ke url service-course/api/my-courses
    const myCourses = await api.get('/api/my-courses', {
      params: { user_id: userId }
    });
    return res.json(myCourses.data);

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