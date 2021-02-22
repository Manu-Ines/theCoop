const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    volunt: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Volunt"
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    like: Boolean,
    comment: {
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