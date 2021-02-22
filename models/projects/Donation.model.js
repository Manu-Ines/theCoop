const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
    donator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    project: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Project'
    },
    contribution: {
        type: Number,
        required: true
    },
    anonymous: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }
)

const Donation = mongoose.model('Donation', donationSchema)
module.exports = Donation