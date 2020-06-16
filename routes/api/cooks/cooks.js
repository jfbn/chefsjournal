const express = require('express');
const router = express.Router();

// fetch db connection
const { connection } = require('../../../connection/mongodb_connection');

router.get('/pd/', (req, res) => {
    return res.send("dw");
});

router.get('/pp/', (req, res) => {
    return res.send("dw");
});


module.exports = router;