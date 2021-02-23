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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
})
// Viruals --------------------------
msgfinaleSchema.virtual('donatorsRecievers', {
    ref: 'Donation',
	foreignField: 'msgfinale',
	localField: '_id'
})
msgfinaleSchema.virtual('voluntRecievers', { // assistanceSchema ->
    ref: 'Assistance',                       // enviar msgfinale a los went: true
	foreignField: 'msgfinale',               // enviar msgCancelacion a los went: false
	localField: '_id'
})
// -----------------------------------

const Msgfinale = mongoose.model('Msgfinale', msgfinaleSchema)
module.exports = Msgfinale