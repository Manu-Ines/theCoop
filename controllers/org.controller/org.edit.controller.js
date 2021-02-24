require('dotenv').config()
const mongoose = require('mongoose')
const Org = require('../../models/Org.model')
const User = require('../../models/User.model')
const { sendActivationEmail } = require('../../configs/mailer.config')
const passport = require('passport')

/* ----------------
   Edit:
   - Name
   - Picture // TODO: real time picture before updating
   - Bio
--------------------- */

module.exports.editProfile = (req, res, next) => {
    res.render('org/edit')
}

module.exports.doEditProfile = (req, res, next) => {
    function renderWithErrors(error) {
        res.status(400).render('user/edit', {
            error: error,
            user: req.body
        })
    }

    if (req.file) { req.body.profilePicture = req.file.path }

    if (req.body.name === '') {
        renderWithErrors('Campo obligatorio')
    } else {
        Org
        .findOneAndUpdate({ _id: req.currentUser.id }, { name: req.body.name, bio: req.body.bio, profilePicture: req.body.profilePicture }, { runValidators: true, useFindAndModify: false })
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
