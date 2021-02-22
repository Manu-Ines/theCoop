const mongoose = require('mongoose')
const WEIRD_PATTERN = /[$%|<>#]/
const regularNum = (num) => {
    // TODO: kata for regulate numbers
}
const categs = require('../configs/categs.config')

const projectSchema = new mongoose.Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Org'// REMINDER: controller createProject -> req.body.owner = req.currentUser.id
    },
    sum: {
        type: Number, 
        set: regularNum,
        required: true
    },
    documents: {
        enum: [ String ]
    },
    title: {
        type: String,
        required: true,
        maxlength: [ 60, 'El título no puede superar 60 caracteres' ],
        match: [ WEIRD_PATTERN, 'El titular solo acepta letras y números' ],
    },
    description: {
        type: String,
        required: true,
        maxlength: [ 300, 'La descripción no puede superar 300 caracteres' ],
    },
    image: {
        type: String,
        // default: TODO: get the one from org
    },
    endDate: {
        type: Date
    },
    categs: {
        type: String,
        required: true,
        enum: categs,
    },
    msgThankyou: {
        type: String,
        maxlength: [200, 'El agradecimiento no puede superar 200 caracteres'],
    },
    boost: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }
)
// Virtuals -----------------------
projectSchema.virtual('donations', {
    ref: 'Donation',
	foreignField: 'project',
	localField: '_id'
})
// --------------------------------

const Project = mongoose.model('Project', projectSchema)
module.exports = Project
