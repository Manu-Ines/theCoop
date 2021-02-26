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

    helper.checkEmailExists(req.body.email)
    .then((user) => {
        if (!user[0] && !user[1]) {
            renderWithErrors('No existe un usuario con este email')
        } else {
            let userType = user[0] ? 0 : 1

            user[0]
                ? User.findOneAndUpdate(
                    { email: req.body.email }, 
                    { token }, 
                    { runValidators: true, useFindAndModify: false })
                : Org.findOneAndUpdate(
                    { email: req.body.email },
                    { token },
                    { runValidators: true, useFindAndModify: false })

            mailer.sendForgotPasswordEmail(user[userType].email, token)

            res.redirect('/')
        }
    })
}

module.exports.activationForgotPassword = (req, res, next) => {
    const { token } = req.params
    helper.activateFromEmail(
        token,
        'user/reset-password',
        'Email verificado correctamente. Ya puedes editar la contraseña',
        '/',
        req, res, next
    )
}

module.exports.resetPassword = (req, res, next) => {
    function renderWithErrors(errors) {
        res.status(400).render('user/reset-password', {
            errors,
            user: req.body,
        })
    }

    if (req.body.newPassword !== req.body.passwordRepeat) {
        renderWithErrors('Las contraseñas no coinciden')
    } else if (req.body.newPassword.length < 6) {
        renderWithErrors('La contraseña debe tener al menos 6 caracteres')
    } else {
        helper.checkEmailExists(req.body.email)
        .then((user) => {
            if (user[0]) {
                User.findOneAndUpdate(
                    { email: req.body.email },
                    { password: req.body.newPassword },
                    { runValidators: true, useFindAndModify: false }
                )
                .then(() => {
                    res.render('user/login', {
                        message: 'Ya puedes iniciar sesión',
                    })
                })
                .catch((e) => {
                    if (e instanceof mongoose.Error.ValidationError) {
                        renderWithErrors(e.errors)
                    } else {
                        next(e)
                    }
                })
            } else {
                Org.findOneAndUpdate(
                    { email: req.body.email },
                    { password: req.body.newPassword },
                    { runValidators: true, useFindAndModify: false }
                )
                .then(() => {
                    res.render('user/login', {
                        message: 'Ya puedes iniciar sesión',
                    })
                })
                .catch((e) => {
                    if (e instanceof mongoose.Error.ValidationError) {
                        renderWithErrors(e.error)
                    } else {
                        next(e)
                    }
                })
            } 
        })
        .catch((e) => {
            next(e)
        })
    }
}

