require('dotenv').config()
const Volunt = require('../models/volunts/Volunt.model')
const categs = require('../configs/categs.config')
const mongoose = require('mongoose')

// Create Volunt
module.exports.create = (req, res, next) => {
    res.render('volunt/create', { categs: categs })
}

module.exports.doCreate = (req, res, next) => {
    req.body.owner = req.currentUser.id
    req.body.image = req.file ? req.file.path : 'no-photo.jpg'

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
            res.render('volunt/detail', { volunt })
        })
}

// Edit Volunt
module.exports.edit = (req, res, next) => {
    Volunt.findOne({ slug: req.params.slug }).then((volunt) => {
        if (volunt.owner.equals(req.currentUser._id)) {
            /* let createDate = new Date(volunt.endDate)
            let date = `${createDate.getFullYear()}-${(
                '0' + createDate.getMonth()
            ).slice(-2)}-${createDate.getDate()}` */

            res.render('volunt/edit', {
                volunt,
                //date,
                categs: categs,
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
module.exports.delete = (req, res, next) => {}
