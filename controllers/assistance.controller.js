require('dotenv').config()
const Assistance = require('../models/volunts/Assistance.model')
const Volunt = require('../models/volunts/Volunt.model')

module.exports.doAssistance = (req, res, next) => {

    req.body.assistant = req.currentUser.id

    Volunt.find({ slug: req.params.slug })
    .then((v) => {
        req.body.volunt = v[0]._id
        Assistance.create(req.body)
        .then((a) => {
    
        })
        .catch(next)
        res.redirect(`/volunt/${req.params.slug}`)
    })
    .catch(next)
    
}