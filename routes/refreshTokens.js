const express = require('express');
const router = express.Router();

const refreshTokensHandler = require('./handler/refresh-tokens');

/* ROUTER refreshTokens file with refreshTokensHandler */
router.post('/', refreshTokensHandler.refreshToken);

module.exports = router;
