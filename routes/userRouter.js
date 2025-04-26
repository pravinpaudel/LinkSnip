const express = require('express');
const router = express.Router();
const { handleUserSignup, handleUsserLogin } = require('../controllers/usersController');


router.post('/signup', handleUserSignup);
router.post('/login', handleUsserLogin);

module.exports = router;
