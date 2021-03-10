const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@“]+(\.[^<>()[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const { v4: uuidv4 } = require('uuid')

const userSchema = new mongoose.Schema(
    {
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
            match: [EMAIL_PATTERN, 'El email contiene caracteres no válidos'],
        },
        password: {
            type: String,
            trim: true,
            required: 'Es necesario introducir una contraseña',
            minlength: [
                6,
                'La contraseña es demasiado corta (Mínimo 6 caracteres)',
            ],
        },
        profilePicture: {
            type: String,
        },
        social: {
            google: String,
            facebook: String,
        },
        active: {
            type: Boolean,
            default: false,
        },
        token: {
            type: String,
            default: uuidv4(),
        },
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER',
        },
        visibility: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        }
    }
)
// Virtuals -----------------------
userSchema.virtual('donations', {
    ref: 'Donation',
    foreignField: 'donator',
    localField: '_id',
})
userSchema.virtual('assistances', {
    ref: 'Assistance',
    foreignField: 'asistant',
    localField: '_id',
})
userSchema.virtual('ratings', {
    ref: 'Rating',
    foreignField: 'user',
    localField: '_id',
})
// --------------------------------

userSchema.methods.checkPassword = function (pass) {
    return bcrypt.compare(pass, this.password)
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, SALT_ROUNDS).then((hash) => {
            this.password = hash
            next()
        })
    } else {
        next()
    }
})

userSchema.pre('findOneAndUpdate', function (next) {
    if (this._update.password) {
        bcrypt
        .hash(this._update.password, SALT_ROUNDS)
        .then((hash) => {
            this._update.password = hash
            next()
        })
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User
