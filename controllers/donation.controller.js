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
        //if (p[0].collected < p[0].sum) {
            let contributionTotal = p[0].collected + req.body.contribution
            let plusOne = p[0].donorsQ + 1

            Project.findOneAndUpdate(
                { slug: req.params.slug }, 
                { collected: contributionTotal, donorsQ: plusOne }, 
                { runValidators: true, useFindAndModify: false })
            .then((p) => {
                req.body.project = p._id
        
                Donation.create(req.body)
                .then((d) => {
                    console.log(d)
                })
                .catch(e => console.log(e))
                res.redirect(`/project/${req.params.slug}`)
            })
            .catch((e) => {
                next(e)
            })
       /*  } else if (p[0].collected >= p[0].sum) {
            // axios
        } */
    })
    
}