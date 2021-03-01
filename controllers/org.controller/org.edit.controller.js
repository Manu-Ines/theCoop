require('dotenv').config()
const mongoose = require('mongoose')
const Org = require('../../models/Org.model')
const { sendActivationEmail } = require('../../configs/mailer.config')
const passport = require('passport')

/* ----------------
   Edit:
   - Name
   - Picture // TODO: real time picture before updating
   - Bio
   - Email
--------------------- */

module.exports.editProfile = (req, res, next) => {
    res.render('org/edit')
}

module.exports.doEditProfileOrg = (req, res, next) => {
    function renderWithErrors(error) {
        res.status(400).render('org/edit', {
            error: error,
            user: req.body
        })
    }

    if (req.file) { req.body.profilePicture = req.file.path }

    if (req.body.name === '') {
        renderWithErrors('Campo obligatorio')
    } else {
        Org
        .findOneAndUpdate(
            { _id: req.currentUser.id },
            req.body,
            { runValidators: true, useFindAndModify: false })
        .then(() => {
            res.redirect('org/profile')
        })
        .catch(e => {
            if (e instanceof mongoose.Error.ValidationError) {
                renderWithErrors(e.errors)
            } else {
                next(e)
            }
        }) 
    }
}
