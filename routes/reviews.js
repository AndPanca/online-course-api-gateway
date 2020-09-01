const express = require('express');
const router = express.Router();

const reviewsHandler = require('./handler/reviews');

/* Router Reviews file with reviewsHandler */
router.post('/', reviewsHandler.create);
router.put('/:id', reviewsHandler.update);
router.delete('/:id', reviewsHandler.destroy);

module.exports = router;
