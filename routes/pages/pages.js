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

router.get('/cook/:id', (req, res) => {
    return res.sendFile(pagesDir + '/specific_cook.html');
})

router.get('/cook', (req, res) => {
    return res.sendFile(pagesDir + '/specific_cook.html');
})

router.get('/signup', (req, res) => {
    if(req.session.username != undefined) {
        return res.redirect('/');
    }
    return res.sendFile(pagesDir + '/signup.html');
})

router.get('/chat', (req, res) => {
    if(req.session.username == undefined) {
        return res.redirect('/');
    } 
    return res.sendFile(pagesDir + '/chat.html');
})

router.get('/newcook', (req, res) => {
    if(req.session.username === undefined) {
        console.log(req.session);
        return res.redirect('/');
    }
    return res.sendFile(pagesDir + '/newcook.html');
})

router.get('/profile', (req, res) => {
    if(req.session.username === undefined) {
        return res.redirect('/');
    } else {
        return res.sendFile(pagesDir + '/profile.html');
    }
})


module.exports = router;