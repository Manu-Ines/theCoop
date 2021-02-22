const mongoose = require('mongoose')
const User = require('./User.model')
const Volunt = require('./Volunt.model')

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    volunt: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Volunt",
        required: true,
    },
    like: Boolean,
    rate: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
}
)

const Rating = mongoose.model('Rating', ratingSchema)
module.exports = Rating