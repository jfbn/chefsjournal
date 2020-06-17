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
                if(model == null) {
                    return res.status(500).send({response: 'dont find ur username'});
                }
                try {
                    bcrypt.compare(password, model.hash, (err, result) => {
                        if(result){
                            req.session.username = username;
                            req.session.firstname = model.username;
                            req.session.wrongpassword = 0;
                            return res.redirect('/');
                        } else {
                            req.session.wrongpassword += 1; 
                            return res.redirect('/');
                        }
                    })
                } catch (err) {
                    return res.status(500).send({"err":err})
                }
            })
    } else {
        return res.status(406).send('i need a username and a password to login');
    }

})

router.get('/logout', (req, res) => {
    req.session.username = null;
    req.session.firstname = null;
    return res.redirect('/');
});

router.get('/session', (req, res) => {
    return res.status(200).send(req.session);
})

module.exports = router;