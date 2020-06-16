const mongoose = require('mongoose');

const cookSchema = new mongoose.Schema( {
    dishName: {
        type: String,
        default: "err: no dish name",
        min: [2, "No dish with less than 2 letters!"]
        
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Simple', 'Intermediate', 'Challenging', 'Masterchef'],
        required: [true, 'you have to specify the difficulty of the dish']
    },
    ingredients: {
        type: Array,
        required: [true, 'no dish without ingredients!']
    }
})

const Cook = mongoose.model('Cook', cookSchema);

module.exports = Cook;