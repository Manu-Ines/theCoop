require('dotenv').config()
const mongoose = require('mongoose')
const Org = require('../../models/Org.model')
const User = require('../../models/User.model')
const Project = require('../../models/projects/Project.model')
const Volunt = require('../../models/volunts/Volunt.model')
const Donation = require('../../models/projects/Donation.model')
const Assistance = require('../../models/volunts/Assistance.model')
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
            req.body.profilePicture = `https://res.cloudinary.com/dd5wme5hw/image/upload/v1615234631/express/default/placeholder-org_qoj79k.jpg`

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

    Volunt.find({ owner: req.currentUser._id })
    .populate({ path: 'assistance', populate: { path: 'assistant' }})
    .then((volunts) => {
        console.log(volunts[0].assistance[0].assistant.name)
        res.render('org/myArea', { volunts })
    })
}
