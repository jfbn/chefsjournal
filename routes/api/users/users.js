const express = require('express');
const router = express.Router();

router.use('/', (req, res) => {
    res.send("no user api yet");
})

module.exports = router;