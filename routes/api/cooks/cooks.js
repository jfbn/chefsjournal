const express = require('express');
const router = express.Router();

const CookService = require('../../../services/cookservice');

// fetch mongoose model
const CookModel = require('../../../models/model_cook');

router.get('/', (req, res) => {
    CookService.find({}).then(model => {
        return res.json({model});
    })
});


// find a users cooks
router.post('/matching', (req, res) => {
    CookService.find(req.body).then( model => {
        return res.json({model});
    }).catch(err => {
        return res.status(400).json({"response:":"there was an error", "err":err})
    });
    
})

// find cooks matching the requested name
router.get('/:name', (req, res) => {
    CookService.find({dishName: req.params.name}).then(model => {
        return res.json({model});
    })
});

// save a new cook document to mongodb
router.post('/', async (req, res) => {
    console.log("got a new dish post: ");
    console.log(req.body);
    try {
        // get information about user from req.session and attach to the body
        req.body.chefName = req.session.username;
        if(req.body.date.length < 1) {
            req.body.date = Date.now();
        }
        const createResult = await CookService.create(req.body);
        return res.status(201).json({ success: createResult });
      } catch (err) {
            return res.status(400).json({ error: err.message });
        }
});

router.delete('/:id', async (req, res) => {
    //find the cook first, to check ownership
    const cook = await CookService.find({ "_id": req.params.id });
    console.log(cook);
    console.log(req.session.username);

    if(req.session.username !== cook[0].chefName){
        return res.status(400).json({ error: "you do not own this cook"})
    }
    console.log("got a delete request");
    try {
        const createResult = await CookService.delete(req.params.id);
        return res.status(201).json({ success: createResult });
      } catch (err) {
        // Make sure that this is a validation error and send it back to the caller
            return res.status(400).json({ error: err.message });
        }
});

router.put('/', async (req, res) => {
    try {
        const createResult = await CookService.update(req.body);
        return res.status(201).json({ success: createResult });
      } catch (err) {
        // Make sure that this is a validation error and send it back to the caller
            return res.status(400).json({ error: err.message });
        }
})

module.exports = router;