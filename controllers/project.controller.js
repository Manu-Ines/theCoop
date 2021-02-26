require('dotenv').config()
const Project = require('../models/projects/Project.model')
const categs = require('../configs/categs.config')

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

module.exports.detail = (req, res, next) => {
    Project.find({ slug: req.params.slug })
        .populate('owner')
        .then((project) => {
            res.render('project/detail', { project: project[0] })
        })
}
