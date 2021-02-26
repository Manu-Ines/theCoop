require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../../models/User.model')

/* ----------------
   Edit:
   - Name
   - Picture
   - Visibility
--------------------- */

module.exports.editProfile = (req, res, next) => {
    res.render('user/edit')
}

module.exports.doEditProfile = (req, res, next) => {
    function renderWithErrors(error) {
        res.status(400).render('user/edit', {
            error: error,
            user: req.body,
        })
    }

    if (req.file) {
        req.body.profilePicture = req.file.path
    }

    if (!req.body.visibility) {
        req.body.visibility = false
    }
    if (req.body.visibility) {
        req.body.visibility === 'on'
            ? (req.body.visibility = true)
            : (req.body.visibility = false)
    }

    if (req.body.name === '') {
        renderWithErrors('Campo obligatorio')
    } else {
        User.findOneAndUpdate(
            { _id: req.currentUser.id },
            req.body, 
            {runValidators: true,
            useFindAndModify: false })
            .then(() => {
                res.redirect('user/profile')
            })
            .catch((e) => {
                if (e instanceof mongoose.Error.ValidationError) {
                    renderWithErrors(e.errors)
                } else {
                    next(e)
                }
            })
    }
}
