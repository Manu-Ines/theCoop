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
    anonymous: {
        type: Boolean,
        default: false
    },
    contribution: {
        type: Number,
        required: true
    }
}, { timestamps: true }
)

const Donation = mongoose.model('Donation', donationSchema)
module.exports = Donation