const apiAdapter = require('../../apiAdapter');

const {
  URL_SERVICE_COURSE,
  HOSTNAME
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

// API GATEWAY GET ALL COURSES
module.exports = async (req, res) => {
  try {
    // Get all request data dari url service-course/api/courses with query params
    const courses = await api.get('/api/courses', {
      params: {
        ...req.query
      }
    });

    // Merubah alamat URL dari first_page dan last_page 
    const coursesData = courses.data;
    const firstPage = coursesData.data.first_page_url.split('?').pop();
    const lastPage = coursesData.data.last_page_url.split('?').pop();
    // Inject data URL
    coursesData.data.first_page_url = `${HOSTNAME}/courses?${firstPage}`;
    coursesData.data.last_page_url = `${HOSTNAME}/courses?${lastPage}`;

    // Cek Next & Prev page url null? Selanjutnya Inject URL Api-Gateway 
    if (coursesData.data.next_page_url) {
      const nextPage = coursesData.data.next_page_url.split('?').pop();
      coursesData.data.next_page_url = `${HOSTNAME}/courses?${nextPage}`;
    }
    if (coursesData.data.prev_page_url) {
      const prevPage = coursesData.data.prev_page_url.split('?').pop();
      coursesData.data.prev_page_url = `${HOSTNAME}/courses?${prevPage}`;
    }

    // Edit URL Path
    coursesData.data.path = `${HOSTNAME}/courses`;

    return res.json(coursesData);

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