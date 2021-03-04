require('dotenv').config()
const Donation = require('../models/projects/Donation.model')
const Project = require('../models/projects/Project.model')

module.exports.doDonation = (req, res, next) => {

    req.body.donator = req.currentUser.id

    if (!req.body.anonymous) {
        req.body.anonymous = false
    }
    if (req.body.anonymous) {
        req.body.anonymous === 'on'
        ? (req.body.anonymous = true)
        : (req.body.anonymous = false)
    }

    Project.find({ slug: req.params.slug })
    .then((p) => {
        req.body.project = p[0]._id
        Donation.create(req.body)
        .then((d) => {
            
        })
        .catch(e => console.log(e))
        res.redirect(`/project/${req.params.slug}`)
    })
    .catch((e) => {
        next(e)
    })
    
}