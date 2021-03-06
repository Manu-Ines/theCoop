require('dotenv').config()
const mongoose = require('mongoose')
const Org = require('../../models/Org.model')
const User = require('../../models/User.model')
const { sendActivationEmail } = require('../../configs/mailer.config')

module.exports.register = (req, res, next) => {
    res.render('org/register')
}

module.exports.doRegister = (req, res, next) => {
    function renderWithErrors(errors) {
        res.status(400).render('org/register', {
            errors: errors,
            user: req.body,
        })
    }

    Promise.all([
        User.findOne({ email: req.body.email }),
        Org.findOne({ email: req.body.email }),
    ]).then((org) => {
        if (org[0] || org[1]) {
            renderWithErrors({
                email: 'Ya existe un usuario con este email',
            })
        } else {
            req.file
                ? (req.body.profilePicture = `${process.env.HOST}/uploads/${req.file.filename}`)
                : (req.body.profilePicture = `https://res.cloudinary.com/dd5wme5hw/image/upload/v1614264579/express/default/rfseib41pqo7ej14hbsw.png`)

            Org.create(req.body)
                .then((u) => {
                    sendActivationEmail(u.email, u.token)
                    res.redirect('/login')
                })
                .catch((e) => {
                    if (e instanceof mongoose.Error.ValidationError) {
                        renderWithErrors(e.errors)
                    } else {
                        next(e)
                    }
                })
        }
    })
}

module.exports.profile = (req, res, next) => {
    res.render('org/profile', { messages: req.flash('info') })
}

module.exports.publicProfile = (req, res, next) => {
    Org.findOne({ _id: req.params.id })
        .then((org) => {
            res.render('org/public-profile', org)
        })
        .catch(next)
}

module.exports.myArea = (req, res, next) => {

        Org.findById( req.currentUser._id )
        .populate('projects')
        .populate('volunts')
        .then((org) => {
            res.render('org/myArea', { org })
        })
        .catch(next)

    
}
