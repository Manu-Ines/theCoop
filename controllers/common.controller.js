require('dotenv').config()
const User = require('../models/User.model')
const Org = require('../models/Org.model')
const mailer = require('../configs/mailer.config')
const helper = require('../helpers/email.helper')
const { v4: uuidv4 } = require('uuid')

/* ----------------
    - Forgot password
    - 
--------------------- */

module.exports.sendForgotPasswordEmail = (req, res, next) => {
    function renderWithErrors(error) {
        res.status(400).render('/login', {
            error,
            user: req.body,
        })
    }

    let token = uuidv4()

    helper.checkEmailExists(req.body.email).then((user) => {
        if (!user[0] && !user[1]) {
            renderWithErrors('No existe un usuario con este email')
        } else {
            let userType = user[0] ? 0 : 1

            user[0]
                ? User.findOneAndUpdate({ email: req.body.email }, { token })
                : Org.findOneAndUpdate({ email: req.body.email }, { token })

            mailer.sendForgotPasswordEmail(user[userType].email, token)

            res.redirect('/')
        }
    })
}

module.exports.activationForgotPassword = (req, res, next) => {
    res.render('/reset')
}

module.exports.resetPassword = (req, res, next) => {
    User.findOneAndUpdate(
        { email: req.body.email },
        { token: newToken, active: false },
        { runValidators: true, useFindAndModify: false }
    )
        .then((user) => {
            mailer.sendChangePassEmailSocial(req.currentUser.email, newToken)
            res.render('/login', {
                message: 'Se ha enviado un correo de verificación',
            })
        })
        .catch((e) => {
            if (e instanceof mongoose.Error.ValidationError) {
                renderWithErrors(e.errors)
            } else {
                next(e)
            }
        })
}
