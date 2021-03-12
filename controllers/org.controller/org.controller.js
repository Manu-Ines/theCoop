require('dotenv').config()
const mongoose = require('mongoose')
const client = require('../../configs/algolia.config')
const index = client.initIndex('organizaciones')
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
                    index
                        .saveObjects([u], {
                            autoGenerateObjectIDIfNotExist: true,
                        })
                        .then((algolia) => {
                            Org.updateOne(
                                { _id: u._id },
                                { algoliaID: algolia.objectIDs[0] }
                            )
                                .then(() => {
                                    sendActivationEmail(u.email, u.token)
                                    res.redirect('/login')
                                })
                                .catch(next)
                        })
                        .catch(next)
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
        .populate({
            path: 'projects',
            populate: [{ path: 'donations' }, { path: 'owner' }],
        })
        .populate({
            path: 'volunts',
            populate: [{ path: 'assistance' }, { path: 'owner' }],
        })
        .then((org) => {
            org.projects.map((obj) => {
                obj.money = obj.donations
                    .filter((d) => d.paid)
                    .reduce((acc, cur) => {
                        return (acc += cur.contribution)
                    }, 0)
                obj.percent = (obj.money * 100) / obj.sum
                return obj
            })

            org.volunts.map((obj) => {
                obj.people = obj.assistance.length
                obj.percent = (obj.people * 100) / obj.assistants
                return obj
            })

            res.render('org/public-profile', org)
        })
        .catch(next)
}

module.exports.myArea = (req, res, next) => {
    Promise.all([
        Project.find({ owner: req.currentUser._id })
            .sort({ createdAt: -1 })
            .populate({ path: 'donations', populate: { path: 'donator' } }),
        Volunt.find({ owner: req.currentUser._id })
            .sort({ createdAt: 1 })
            .populate({ path: 'assistance', populate: { path: 'assistant' } }),
    ]).then((results) => {
        if (results[0].length == 0 && results[1].length == 0) {
            console.log('1')
            res.render('org/myArea', {
                messageP: 'No se ha creado ningún proyecto',
                messageV: 'No se ha creado ningún voluntariado aún',
            })
        } else if (results[0].length == 0 && results[1] !== 0) {
            res.render('org/myArea', {
                messageP: 'No se ha creado ningún proyecto',
                volunts: results[1],
            })
        } else if (results[1].length == 0 && results[0] !== 0) {
            res.render('org/myArea', {
                projects: results[0],
                messageV: 'No se ha creado ningún voluntariado aún',
            })
        } else {
            res.render('org/myArea', {
                projects: results[0],
                volunts: results[1],
            })
        }
    })
}

module.exports.list = (req, res, next) => {
    Org.find().then((orgs) => {
        res.render('org/list', { orgs })
    })
}
