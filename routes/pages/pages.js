const express = require('express');
const router = express.Router();
const path = require('path');

// to get absolute path of where we are
var pagesDir = path.normalize(__dirname+"/../../pages");

router.get('/', (req, res) => {

    if(req.session.username != undefined) {
        // user is logged in

        return res.sendFile(pagesDir + '/dashboard.html');
    }

    return res.sendFile(pagesDir + '/login.html');
})  


module.exports = router;