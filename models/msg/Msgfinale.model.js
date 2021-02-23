const mongoose = require('mongoose')

const msgfinaleSchema = new mongoose.Schema({
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Org'
    },
    about: {
        project: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Project'
        },
        volunt: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Volunt"
        }
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true }
)

const Msgfinale = mongoose.model('Msgfinale', msgfinaleSchema)
module.exports = Msgfinale