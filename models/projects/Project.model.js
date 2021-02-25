const mongoose = require('mongoose')
const WEIRD_PATTERN = /^[A-Za-z0-9\s]+$/g
const regularNum = (num) => {
    // TODO: kata for regulate numbers
}
const categs = require('../../configs/categs.config')

const projectSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Org', // REMINDER: controller createProject -> req.body.owner = req.currentUser.id
        },
        sum: {
            type: Number,
            //set: regularNum,
            required: true,
        },
        documents: {
            enum: [String],
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: [150, 'El título no puede superar 150 caracteres'],
            match: [WEIRD_PATTERN, 'El titular solo acepta letras y números'],
        },
        slug: {
            type: String,
            unique: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: [3000, 'La descripción no puede superar 300 caracteres'],
        },
        image: {
            type: String,
            // default: TODO: get the one from org
        },
        endDate: {
            type: Date,
        },
        categs: {
            type: String,
            required: true,
            enum: categs, // categs.configs.js
        },
        msgThankyou: {
            type: String,
            maxlength: [
                200,
                'El agradecimiento no puede superar 200 caracteres',
            ],
        },
        boost: {
            type: Boolean,
            default: false,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
)
// Virtuals -----------------------
projectSchema.virtual('donations', {
    ref: 'Donation',
    foreignField: 'project',
    localField: '_id',
})
// --------------------------------

projectSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug =
            this.title.split(' ').join('-') +
            '-' +
            Math.floor(Math.random() * (9999 - 1) + 1)
        next()
    } else {
        next()
    }
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project
