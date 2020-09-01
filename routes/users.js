const express = require('express');
const router = express.Router();

const usersHandler = require('./handler/users')
const verifyToken = require('../middlewares/verifyToken');

/* ROUTER USERS file with usersHandler */
router.post('/register', usersHandler.register);
router.post('/login', usersHandler.login);
router.put('/', verifyToken, usersHandler.update); // Ketika akan update wajib verify akses token 
router.get('/', verifyToken, usersHandler.getUser); // Ketika akan get user wajib verify akses token 
router.post('/logout', verifyToken, usersHandler.logout);

module.exports = router;
