const mongoose = require('mongoose')
const WEIRD_PATTERN = /[$%|<>#]/
const regularNum = (num) => {
    // TODO: INES
}
const categs = require('../configs/categs.config')

const projectSchema = new mongoose.Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Org'// REMINDER: controller createProject -> req.body.owner = req.currentUser.id
    },
    donors: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    collection: {
        type: Number, 
        set: regularNum,
        required: true
    },
    currentCollection: {
        type: Number,
        set: regularNum,
        default: 0
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

const Project = mongoose.model('Project', projectSchema)
module.exports = Project
