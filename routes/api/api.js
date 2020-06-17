const express = require('express');
const router = express.Router();

// get children endpoints
const cooksApi = require('./cooks/cooks');
const usersApi = require('./users/users');
const authApi = require('./auth/auth.js');

// establish db connection
const db = require('../../connection/mongodb_connection');

router.use('/cooks/', cooksApi);
router.use('/users', usersApi);
router.use('/auth', authApi);
router.use('/', (req, res) => {
    return res.send("theres nothing here")
})

module.exports = router;
