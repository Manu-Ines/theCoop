const mongoose = require('mongoose')
const TITLE_RGX = /^[0-9a-zñáéíóúü\s]+$/i

const categs = require('../../configs/categs.config')

const projectSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Org',
        },
        sum: {
            type: Number,
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
            match: [
                TITLE_RGX,
                'Tu título no puede contener caracteres especiales',
            ],
        },
        slug: {
            type: String,
            unique: true,
        },
        description: {
            type: String,
            maxlength: [
                3000,
                'La descripción no puede superar 3000 caracteres',
            ],
            default: 'Sin descripción',
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
        adress: {
            type: String,
        },
        msgThankyou: {
            type: String,
            maxlength: [
                200,
                'El agradecimiento no puede superar 200 caracteres',
            ],
            default:
                'Al crear el proyecto las orgs en step 4 msgThankyou: Gracias por su donación',
        },
        boost: {
            type: Boolean,
            default: false,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        index: {
            type: Boolean,
            default: false,
        },
        algoliaID: {
            type: String,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)
// Virtuals -----------------------
projectSchema.virtual('donations', {
    ref: 'Donation',
    foreignField: 'project',
    localField: '_id',
})
// --------------------------------

projectSchema.once
projectSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        let randomNumber = Math.floor(Math.random() * (9999 - 1) + 1)
        let chars = { ñ: 'n', á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u' }
        this.slug =
            this.title
                .trim()
                .toLowerCase()
                .replace(/[ñáéíóúü]/g, (m) => chars[m])
                .split(' ')
                .join('-') +
            '-' +
            randomNumber
        next()
    } else {
        next()
    }
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project
