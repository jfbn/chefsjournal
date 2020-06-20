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

router.get('/signup', (req, res) => {

    if(req.session.username != undefined) {
        return res.redirect('/');
    }
    return res.sendFile(pagesDir + '/signup.html');

})

router.get('/newcook', (req, res) => {

    if(req.session.username == undefined) {
        console.log(req.session);
        return res.redirect('/');
    }
    return res.sendFile(pagesDir + '/newcook.html');

})


module.exports = router;