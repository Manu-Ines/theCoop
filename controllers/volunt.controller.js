require('dotenv').config()
const mongoose = require('mongoose')
const Volunt = require('../models/volunts/Volunt.model')
const Assistance = require('../models/volunts/Assistance.model')

const categs = require('../configs/categs.config')
const mailer = require('../configs/mailer.config')

// Create Volunt
module.exports.create = (req, res, next) => {
    res.render('volunt/create', { categs: categs })
}

module.exports.doCreate = (req, res, next) => {
    let placeholders = [
        'https://res.cloudinary.com/dd5wme5hw/image/upload/v1615233330/express/default/placeholder-3_wr2twv.jpg',
        'https://res.cloudinary.com/dd5wme5hw/image/upload/v1615233330/express/default/placeholder-1_j41wgo.jpg',
        'https://res.cloudinary.com/dd5wme5hw/image/upload/v1615233330/express/default/placeholder-4_nsy0if.jpg',
        'https://res.cloudinary.com/dd5wme5hw/image/upload/v1615233330/express/default/placeholder-2_wx8cco.jpg',
    ]

    req.body.owner = req.currentUser.id
    req.body.image = req.file
        ? req.file.path
        : placeholders[Math.floor(Math.random() * (5 - 1) + 1)]
    req.body.date = [
        {
            day: req.body.day,
            time: {
                start: req.body.timeStart,
                end: req.body.timeEnd,
            },
        },
    ]
    console.log(req.body)
    Volunt.create(req.body)
        .then((volunt) => {
            res.redirect(`/volunt/${volunt.slug}`)
        })
        .catch(next)
}

// View Volunt
module.exports.detail = (req, res, next) => {
    Volunt.findOne({ slug: req.params.slug })
        .populate('owner')
        .then((volunt) => {
            Assistance.find({ volunt: volunt._id })
                .then((assists) => {
                    let reserved = assists.length

                    res.render('volunt/detail', { volunt, reserved })

                    // TODO: block assistances if full
                })
                .catch(() => next)
        })
        .catch(() => next)
}

// Edit Volunt
module.exports.edit = (req, res, next) => {
    Volunt.findOne({ slug: req.params.slug }).then((volunt) => {
        if (volunt.owner.equals(req.currentUser._id)) {
            let createDate = new Date(volunt.endDate)
            let date = `${createDate.getFullYear()}-${(
                '0' + createDate.getMonth()
            ).slice(-2)}-${createDate.getDate()}`

            Assistance.find({ volunt: volunt._id }).then((assists) => {
                if (assists.length == 0) {
                    let noVolunts = true
                    res.render('volunt/edit', {
                        volunt,
                        date,
                        categs: categs,
                        noVolunts,
                    })
                } else {
                    res.render('volunt/edit', { volunt, date, categs: categs })
                }
            })
        } else {
            req.flash('flashMessage', 'No puedes editar este proyecto')
            res.redirect('/')
        }
    })
}

module.exports.doEdit = (req, res, next) => {
    if (req.file) {
        req.body.image = req.file.path
    }

    Volunt.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        useFindAndModify: false,
    })
        .then((volunt) => {
            res.redirect(`/volunt/${volunt.slug}`)
        })
        .catch(next)
}

// Delete Volunt
module.exports.doDelete = (req, res, next) => {
    Volunt.findOne({ _id: req.params.id })
        .populate('owner')
        .then((volunt) => {
            if (req.currentUser) {
                if (volunt.owner.equals(req.currentUser._id)) {
                    Assistance.find({ volunt: volunt._id }).then((assists) => {
                        if (assists.length === 0) {
                            Volunt.deleteOne({ _id: volunt.id }).then(() => {
                                res.redirect('/org/profile')
                            })
                        } else {
                            mailer.deleteProyectRequest(
                                'ipalmamasaveu@gmail.com',
                                volunt.owner.name,
                                volunt._id,
                                req.body.reason
                            )
                            req.flash(
                                'flashMessage',
                                'Solicitud para eliminar el voluntariado enviada'
                            )
                            res.redirect(`/volunt/${volunt.slug}`)
                        }
                    })
                } else {
                    req.flash(
                        'flashMessage',
                        'No puedes eliminar este voluntariado'
                    )
                    res.redirect('/')
                }
            } else {
                req.flash(
                    'flashMessage',
                    'No puedes eliminar este voluntariado'
                )
                res.redirect('/')
            }
        })
        .catch(next)
}
