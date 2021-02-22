const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@“]+(\.[^<>()[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const { v4: uuidv4 } = require('uuid');

/* 
    TODO: faltan los virtuals
    ============================
    - Mensajes directos
    - Mensajes finalización
    ============================
*/

const orgSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Es necesario introducir un nombre',
        maxlength: [100, 'El nombre es demasiado largo'],
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: 'Es necesario introducir un correo electrónico',
        match: [EMAIL_PATTERN, 'El email contiene caracteres no válidos']
    },
    password: {
        type: String,
        trim: true,
        required: 'Es necesario introducir una contraseña',
        maxlength: [50, 'La contraseña es demasiado larga (Máximo 50 caracteres)'],
        minlength: [6, 'La contraseña es demasiado corta (Mínimo 6 caracteres)']
    },
    cif: {
        type: String,
        trim: true,
        uppercase: true,
        required: 'Es necesario introducir un el CIF/NIF',
        maxlength: [10, 'El CIF/NIF es demasiado largo'],
        minlength: [5, 'El CIF/NIF debe ser válido']
    },
    document: {
        type: String
    },
    web: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true,
        maxlength: [500, 'La descripción es demasiado larga'],
    },
    profilePicture: {
        type: String
    },
    bank: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: uuidv4()
    },
    role: {
        type: String,
        enum: ['ORG', 'ADMIN'],
        default: 'ORG'
    },
    rank: {
        type: Number,
        default: 0 
    }
}, { timestamps: true }
)
// Virtuals -----------------------
orgSchema.virtual('projects', {
    ref: 'Project',
	foreignField: 'owner',
	localField: '_id'
})
orgSchema.virtual('volunts', {
    ref: 'Volunt',
    foreignField: 'owner',
	localField: '_id'
})
// --------------------------------

orgSchema.methods.checkPassword = function(pass) {
    return bcrypt.compare(pass, this.password)
}

orgSchema.pre('save', function(next) {
    if(this.isModified('password')){
        bcrypt
            .hash(this.password, SALT_ROUNDS)
            .then(hash => {
                this.password = hash
                next()
            })
    } else {
        next()
    }
})

orgSchema.pre('findOneAndUpdate', function(next) {
    if(this._update.password){
        bcrypt
            .hash(this._update.password, SALT_ROUNDS)
            .then(hash => {
                this._update.password = hash
                next()
            })
    } else {
        next()
    }
})

const Org = mongoose.model('Org', orgSchema)
module.exports = Org