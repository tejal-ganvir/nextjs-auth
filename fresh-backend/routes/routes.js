const { response } = require('express');
const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');


router.post('/signup', AuthController.register);

router.post('/signin', AuthController.login);

router.get('/allusers', AuthController.allUsers);

router.get('/singleuser', AuthController.singleUsers);

module.exports = router