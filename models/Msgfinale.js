const mongoose = require('mongoose')

const msgfinaleSchema = new mongoose.Schema({
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Org'
    },
    message: {
        type: String,
        required: true
    }
}, { timestaps: true })

const Msgfinale = mongoose.model('Msgfinale', msgfinaleSchema)
module.exports = Msgfinale