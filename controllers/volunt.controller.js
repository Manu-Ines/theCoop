require('dotenv').config()
const client = require('../configs/algolia.config')
const index = client.initIndex('volunts')
const mongoose = require('mongoose')
const Volunt = require('../models/volunts/Volunt.model')
const Assistance = require('../models/volunts/Assistance.model')
const User = require('../models/User.model')

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
        : placeholders[Math.floor(Math.random() * (4 - 1) + 1)]
    req.body.date = [{
            day: req.body.day,
            time: {
                start: req.body.timeStart,
                end: req.body.timeEnd,
            }
    }]
    
    Volunt.create(req.body)
        .then((volunt) => {
            index
                .saveObjects([volunt], {
                    autoGenerateObjectIDIfNotExist: true,
                })
                .then((obj) => {
                    Volunt.updateOne(
                        { _id: volunt._id },
                        { algoliaID: obj.objectIDs[0] }
                    ).then(() => {
                        res.redirect(`/volunt/${volunt.slug}`)
                    })
                })
                .catch(next)
        })
        .catch(next)
}

// View Volunt
module.exports.detail = (req, res, next) => {
    Volunt.findOne({ slug: req.params.slug })
        .populate('owner')
        .then((volunt) => {
            if (!volunt) next()
            Assistance.find({ volunt: volunt._id })
                .then((assists) => {
                    let reserved = assists.length

                    if (reserved === 0) {
                        console.log('here 0')
                        res.render('volunt/detail', { volunt, reserved })
                    } else {
                        let imGoing = false
                        assists.forEach((a) => {
                            if (
                                req.currentUser &&
                                a.assistant.equals(req.currentUser._id)
                            ) {
                                imGoing = true
                            }
                        })
                        res.render('volunt/detail', {
                            volunt,
                            reserved,
                            imGoing,
                        })
                    }
                })
                .catch(() => next)
        })
        .catch(() => next)
}

module.exports.list = (req, res, next) => {
    Volunt.find({ completed: false })
        .limit(50)
        .populate('owner')
        .populate('assistance')
        .then((volunts) => {
            volunts.map((obj) => {
                obj.people = obj.assistance.length
                obj.percent = (obj.people * 100) / obj.assistants
                return obj
            })
            res.render('volunt/list', { volunts, categs: categs })
        })
}

module.exports.filter = (req, res, next) => {
    let { day, category } = req.query
    const MORNING_REGEX = /^(06|07|08|09|10|11|12)/
    const MIDAY_REGEX = /^(13|14|15)/
    const AFTERNOON_REGEX = /^(16|17|18|19|20|21|22)/
    const ALL_REGEX = /^(0|1|2)/
    let time = 0
    
    if (req.query.time === "1") {
        time = MORNING_REGEX
    } else if (req.query.time === "2") {
        time = MIDAY_REGEX
    } else if (req.query.time === "3") {
        time = AFTERNOON_REGEX
    } else {
        time = ALL_REGEX
    }
    
    if (!req.query.day) {
        day = ALL_REGEX
    }

    Volunt.find({
        completed: false,
        categs: category,
        "date.day": day,
        "date.time.start": time
    })                         
        .limit(50)
        .populate('owner')
        .populate('assistance')
        .then((volunts) => {
            volunts.map((obj) => {
                obj.people = obj.assistance.length
                obj.percent = (obj.people * 100) / obj.assistants
                return obj
            })
            res.render('volunt/list', { volunts, categs: categs })
        })
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
            req.body.objectID = volunt.algoliaID

            index
                .partialUpdateObject(req.body)
                .then(() => {
                    res.redirect(`/volunt/${volunt.slug}`)
                })
                .catch(next)
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
                                index
                                    .deleteObjects([volunt.algoliaID])
                                    .then(() => {
                                        res.redirect('/org/profile')
                                    })
                                    .catch(next)
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
