const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

/* UNTUK VERIFIKASI AKSES TOKEN KE SUATU END POINT API */
module.exports = async (req, res, next) => {
  // Ambil token dari Headers dengan key Authorization
  const token = req.headers.authorization;

  // Cek token dari Headers valid atau tidak
  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).json({ message: err.message });
    }

    // Inject data decoded di object request 
    req.user = decoded;
    // Lanjut ke route selanjutnya/middleware selanjutnya jika ada
    return next();
  });
}