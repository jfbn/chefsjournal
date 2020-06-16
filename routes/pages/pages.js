const express = require('express');
const router = express.Router();

router.use('/', (req, res) => {
    return res.send("no pages yet");
})

module.exports = router;