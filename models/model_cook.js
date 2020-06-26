const mongoose = require('mongoose');

const cookSchema = new mongoose.Schema( {
    dishName: {
        type: String,
        default: "err: no dish name",
        lowercase: true,
        trim: true,
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
        enum: ['Easy', 'Simple', 'Intermediate', 'Challenging', 'Masterchef', 'Gordon Ramsay'],
        required: [true, 'you have to specify the difficulty of the dish']
    },
    ingredients: {
        type: Array,
        required: [true, 'no dish without ingredients!']
    },
    cost: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true
        }
    },
    chefName: {
        type: String,
        required: [true, 'food doesnt cook itself'],
        lowercase: true,
        trim: true,
        minlength: 2,
        maxlength: 25
    },
    duration: {
        type: Number,
        required: [true, 'you have to specify the duration of the cook']
    },
    amountOfEaters: {
        type: Number,
        required: [true, 'You have to specify how many people this cook was for']
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: String,
        default: "No comments"
    },
    instructions: {
        type: String,
        default: "No instructions"
    },
    isVegan: {
        type: Boolean,
        default: false
    }
})



module.exports = mongoose.model('Cook', cookSchema);