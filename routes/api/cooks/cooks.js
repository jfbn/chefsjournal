const express = require('express');
const router = express.Router();

const CookService = require('../../../services/cookservice');

// fetch mongoose model
const CookModel = require('../../../models/model_cook');

router.get('/', (req, res) => {
    CookModel.find({}).then(model => {
        console.log
        return res.json({model});
    })
});



// find a users cooks
router.post('/matching', (req, res) => {
    console.log(req.body);
    CookModel.find(req.body).then( model => {
        console.log(model);
        return res.json({model});
    }).catch(err => {
        return res.status(400).json({"response:":"there was an error", "err":err})
    });
    
})

// find cooks matching the requested name
router.get('/:name', (req, res) => {
    CookModel.find({dishName: req.params.name}).then(model => {
        return res.json({model});
    })
});

// save a new cook document to mongodb
router.post('/', async (req, res) => {
    try {
        // get information about user from req.session and attach to the body
        req.body.chefName = req.session.username;
        const createResult = await CookService.create(req.body);
        console.log(createResult);
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


router.delete('/:id', async (req, res) => {
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