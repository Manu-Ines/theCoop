require('dotenv').config()
const Project = require('../models/projects/Project.model')
const Donation = require('../models/projects/Donation.model')

const categs = require('../configs/categs.config')
const mailer = require('../configs/mailer.config')

// Create project
module.exports.create = (req, res, next) => {
    res.render('project/create', { categs: categs })
}

module.exports.doCreate = (req, res, next) => {
    req.body.owner = req.currentUser.id
    req.body.image = req.file ? req.file.path : 'no-photo.jpg'

    Project.create(req.body)
        .then((project) => {
            res.redirect(`/project/${project.slug}`)
        })
        .catch(next)
}

// View project
module.exports.detail = (req, res, next) => {
    Project.findOne({ slug: req.params.slug })
        .populate('owner')
        .then((project) => {
            Donation.find({ project: project._id })
            .then((donations) => {
                let donatorsTotal = donations.length
                let collectedTotal = donations.reduce((acc, curr) => acc + curr.contribution, 0)
                
                res.render('project/detail', { project, collectedTotal, donatorsTotal })

                if (project.sum <= collectedTotal) {
                    // 
                } 
            })
            .catch(() => next)
        })
        .catch(() => next)
}

// Edit project
module.exports.edit = (req, res, next) => {
    Project.findOne({ slug: req.params.slug }).then((project) => {
        if (project.owner.equals(req.currentUser._id)) {
            let createDate = new Date(project.endDate)
            let date = `${createDate.getFullYear()}-${(
                '0' + createDate.getMonth()
            ).slice(-2)}-${createDate.getDate()}`

            res.render('project/edit', {
                project,
                date,
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

    Project.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        useFindAndModify: false,
    })
        .then((project) => {
            res.redirect(`/project/${project.slug}`)
        })
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    Project.findOne({ slug: req.params.slug }).then((project) => {
        if (project.owner.equals(req.currentUser._id)) {
            // TODO: Si tiene 0 donaciones, puedes eliminar, sino solo puedes editar o solicitar eliminacion
        } else {
            req.flash('flashMessage', 'No puedes eliminar este proyecto')
            res.redirect('/')
        }
    })
}
