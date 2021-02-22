const mongoose = require('mongoose')

const assistanceSchema = new mongoose.Schema({
    volunt: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Volunt'
    },
    assistant: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    went: {
        type: Boolean,
        default: true
    }
})

const Assistance = mongoose.model('Assistance', assistanceSchema)
module.exports = Assistance