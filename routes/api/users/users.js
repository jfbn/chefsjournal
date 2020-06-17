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
    UserModel.find({}).then(model => {
        return res.json(model);
    })
})

router.get('/currentuser', (req, res) => {
    console.log("dd")
    if(req.session.username != undefined) {
        return res.json(req.session);
    }
    else {
        return res.status(400).send({response: "no logged in user"});
    }
})

router.post('/', (req, res) => {

    const { username, password, firstname } = req.body;

    if (username && password && firstname) {
        
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            // Store hash in your password DB.            
            try {
                const createResult = await UserService.create({"username": username, "hash": hash, "firstname": firstname});
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
        return res.status(400).json({response: "username, password, or firstname is missing"})
    }

})

module.exports = router;