const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');

// get the users mongoose model
const UserModel = require('../../../models/model_user');

router.post('/login', (req, res) =>{
    const { username, password } = req.body;
    if( username && password ) {
        UserModel.findOne({"username": username})
            .then( model => {
                if(model == null) {
                    return res.redirect('/');
                }
                try {
                    bcrypt.compare(password, model.hash, (err, result) => {
                        if(result){
                            req.session.username = username;
                            req.session.firstname = model.firstname;
                            req.session.wrongpassword = 0;
                            console.log(username +" logged in");
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
        return res.status(400).send({"response": "there was an error","err": err});
    }

})

router.get('/logout', (req, res) => {
    req.session.username = null;
    req.session.firstname = null;
    return res.redirect('/');
});

router.get('/session', (req, res) => {
    return res.status(200).send({
        "username": req.session.username,
        "firstname": req.session.firstname,
        "wrongpassword": req.session.wrongpassword});
})

module.exports = router;