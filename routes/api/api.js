const express = require('express');
const router = express.Router();

// get children endpoints
const cooksApi = require('./cooks/cooks');
const usersApi = reuqire('./users/users');

// fetch db connection
const { connection } = require('../../../connection/mongodb_connection');

router.use('/cooks', cooksApi);
router.use('users', usersApi);

module.exports = router;
