const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// load user service
const UserService = require('../../../services/userservice');

// configure bcrypt
const saltRounds = 8;

// get the users mongoose model
const UserModel = require('../../../models/model_user');

router.get('/', async (req, res) => {
    UserModel.find({}, {hash: 0}).then(model => {
        return res.json(model);
    })
})

router.get('/currentuser', (req, res) => {
    if(req.session.username !== undefined) {
        UserModel.find({"username": req.session.username}, {hash: 0}).then(model => {
            return res.json(model);
        });
    }
    else {
        return res.status(400).send({response: "no logged in user"});
    }
})

router.post('/', (req, res) => {
    const { username, password, firstname, email, subscribed} = req.body;
    console.log("got a new user post");
    console.log(req.body);

    if (username && password && firstname && email && subscribed !== undefined) {

        // format input to our liking
        firstnameFormated = (firstname.charAt(0) + "" ).toUpperCase() + firstname.substring(1).toLowerCase();
        
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            // Store hash in your password DB.            
            try {
                const createResult = await UserService.create({"username": username.toLowerCase(), "hash": hash, "firstname": firstnameFormated, "email": email, "subscribed": subscribed});
                return res.status(201).json({ success: createResult });
              } catch (err) {
                // Make sure that this is a validation error and send it back to the caller
                if (err.name === 'ValidationError') {
                    return res.status(400).json({ error: err.message });
                } else {
                    return res.status(400).json({ error: err.message });
                }
              }
        });
    } else {
        return res.status(400).json({response: "there was an error", error: "you need to supply a username, password, and firstname to signup"});
    }

})

module.exports = router;