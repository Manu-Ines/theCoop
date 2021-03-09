const mongoose = require('mongoose')
const TITLE_RGX = /^[0-9a-zñáéíóúü\s]+$/i
const categs = require('../../configs/categs.config')

const voluntSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Org', // REMINDER: controller createVolunt -> req.body.owner = req.currentUser.id
        },
        title: {
            type: String,
            required: true,
            maxlength: [60, 'El título no puede superar 60 caracteres'],
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
        type: {
            type: String,
            enum: ['Puntual', 'Recurrente'],
        },
        date: [
            {
                day: { type: String },
                time: {
                    start: { type: String },
                    end: { type: String },
                },
            },
        ],
        categs: {
            type: String,
            required: true,
            enum: categs, // categs.configs.js
        },
        assistants: {
            type: Number,
        },
        adress: {
            type: String,
            required: true,
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
        index: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)
// Viruals --------------------------
voluntSchema.virtual('assistance', {
    ref: 'Assistance',
    foreignField: 'volunt',
    localField: '_id',
})

voluntSchema.virtual('ratings', {
    ref: 'Rating',
    foreignField: 'user',
    localField: '_id',
})
// ----------------------------------

voluntSchema.pre('save', function (next) {
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

const Volunt = mongoose.model('Volunt', voluntSchema)
module.exports = Volunt
