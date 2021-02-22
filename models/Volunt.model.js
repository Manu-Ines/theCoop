const mongoose = require('mongoose')

const voluntSchema = new mongoose.Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Org'// REMINDER: controller createProject -> req.body.owner = req.currentUser.id
    },
    title: {
        type: String,
        required: true,
        maxlength: [60, 'El título no puede superar 60 caracteres'],
        match: [WEIRD_PATTERN, 'El titular solo acepta letras y números'],
    },
    description: {
        type: String,
        required: true,
        maxlength: [300, 'La descripción no puede superar 300 caracteres'],
    },
    image: {
        type: String,
        // default: TODO: get the one from org
    },
    type: {
        enum: ['Puntual', 'Recurrente']
    },
    date: [{
        day: { type: Date },
        periods: [{
          start: { type: Date },
          end: { type: Date }
        }]
    }],
    assistants: {
        type: Number
    },
    goingassitants: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Assistance'
    },
    ratings: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Rating'
    },
    msgThankyou: {
        type: String,
        maxlength: [200, 'El agradecimiento no puede superar 200 caracteres'],
    },
    boost: {
        type: Boolean,
        default: false
    },
}, { timestamps: true }
)

voluntSchema.virtual('assistance', {
	ref: 'Assistance',
	localField: '_id',
	foreignField: 'user'
})

voluntSchema.virtual('ratings', {
	ref: 'Rating',
	localField: '_id',
	foreignField: 'user'
})

const Volunt = mongoose.model('Volunt', voluntSchema)
module.exports = Volunt