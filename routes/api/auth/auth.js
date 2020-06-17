const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');


// load user service
const UserService = require('../../../services/userservice');

// configure bcrypt
const saltRounds = 8;

// get the users mongoose model
const UserModel = require('../../../models/model_user');

router.post('/login', (req, res) =>{
    const { username, password } = req.body;

    if( username && password ) {
        UserModel.findOne({"username": username})
            .then( model => {
                bcrypt.compare(password, model.hash, (err, result) => {
                    if(result){
                        console.log("success");
                        req.session.username = username;
                        req.session.firstname = model.username;
                        return res.send(req.session);
                    } else {
                        return res.status(406).send('wrong creds');
                    }
                })
            })
    } else {
        return res.status(406).send('i need a username and a password to login');
    }

})

router.get('/logout', (req, res) => {
    console.log("logged out");
    req.session.username = null;
    req.session.firstname = null;
    return res.send(req.session);
});

module.exports = router;