const mongoose = require('mongoose');

const cookSchema = new mongoose.Schema( {
    dishName: {
        type: String,
        default: "err: no dish name",
        min: [2, "No dish with less than 2 letters!"],
        validate: {
            validator: (v) => {
                return v.length > 2
            },
            message: "dish name must be longer than 2 characters"
        },        
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Simple', 'Intermediate', 'Challenging', 'Masterchef'],
        required: [true, 'you have to specify the difficulty of the dish']
    },
    ingredients: {
        type: Array,
        required: [true, 'no dish without ingredients!']
    },
    price: {
        type: Number,
        required: [true, 'no food is free']
    },
    chefName: {
        type: String,
        required: [true, 'food doesnt cook itself'],
        minlength: 2,
        maxlength: 25
    }
})



module.exports = mongoose.model('Cook', cookSchema);