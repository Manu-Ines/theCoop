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
            Donation.find({ project: project._id, paid: true })
                .then((donations) => {
                    let donatorsTotal = donations.length
                    let collectedTotal = donations.reduce(
                        (acc, curr) => acc + curr.contribution,
                        0
                    )

                    res.render('project/detail', {
                        project,
                        collectedTotal,
                        donatorsTotal,
                    })

                    if (project.sum <= collectedTotal) {
                        // TODO
                    }
                })
                .catch(() => next)
        })
        .catch(() => next)
}

// Edit project
module.exports.edit = (req, res, next) => {
    Project.findOne({ slug: req.params.slug })
        .populate('owner')
        .then((project) => {
            if (project.owner.equals(req.currentUser._id)) {
                let createDate = new Date(project.endDate)
                let date = `${createDate.getFullYear()}-${(
                    '0' +
                    createDate.getMonth() +
                    1
                ).slice(-2)}-${createDate.getDate()}`

                Donation.find({ project: project._id }).then((donations) => {
                    if (donations.length == 0) {
                        let noProjects = true
                        res.render('project/edit', {
                            project,
                            date,
                            categs: categs,
                            noProjects,
                        })
                    } else {
                        res.render('project/edit', {
                            project,
                            date,
                            categs: categs,
                        })
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

    Project.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        useFindAndModify: false,
    })
        .then((project) => {
            res.redirect(`/project/${project.slug}`)
        })
        .catch(next)
}

module.exports.doDelete = (req, res, next) => {
    Project.findOne({ _id: req.params.id })
        .populate('owner')
        .then((project) => {
            if (req.currentUser) {
                if (project.owner.equals(req.currentUser._id)) {
                    Donation.find({ project: project._id }).then(
                        (donations) => {
                            if (donations.length === 0) {
                                Project.deleteOne({ _id: project.id }).then(
                                    () => {
                                        res.redirect('/org/profile')
                                    }
                                )
                            } else {
                                mailer.deleteProyectRequest(
                                    'ipalmamasaveu@gmail.com',
                                    project.owner.name,
                                    project._id,
                                    req.body.reason
                                )
                                req.flash(
                                    'flashMessage',
                                    'Solicitud para eliminar el proyecto enviada'
                                )
                                res.redirect(`/project/${project.slug}`)
                            }
                        }
                    )
                } else {
                    req.flash(
                        'flashMessage',
                        'No puedes eliminar este proyecto'
                    )
                    res.redirect('/')
                }
            } else {
                req.flash('flashMessage', 'No puedes eliminar este proyecto')
                res.redirect('/')
            }
        })
        .catch(next)
}
