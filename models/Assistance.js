const mongoose = require('mongoose')

const assistanceSchema = new mongoose.Schema({
    assistant: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    volunt: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Volunt'
    }
})

const Assistance = mongoose.model('Assistance', assistanceSchema)
module.exports = Assistance