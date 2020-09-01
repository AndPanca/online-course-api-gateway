const express = require('express');
const router = express.Router();

const mediaHandler = require('./handler/media');
/* CONTOH PROTEKSI END POINT HANYA UNTUK ROUTE TERTENTU */
// const verifyToken = require('../middlewares/verifyToken');
// router.get('/', verifyToken, mediaHandler.getAll);

/* ROUTER MEDIA file with mediaHandler */
router.post('/', mediaHandler.create);
router.get('/', mediaHandler.getAll);
router.delete('/:id', mediaHandler.destroy);

module.exports = router;
