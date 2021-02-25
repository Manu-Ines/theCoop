require('dotenv').config()
const mongoose = require('mongoose')
const passport = require('passport')
const { v4: uuidv4 } = require('uuid')

const User = require('../../models/User.model')
const Org = require('../../models/Org.model')
const mailer = require('../../configs/mailer.config')
const helper = require('../../helpers/email.helper')

/* ----------------
    - Email change
    - Password change
    - Delete account (modelo GoneUser+)
    -* Métodos de pago
--------------------- */

module.exports.settings = (req, res, next) => {
    res.render('user/settings')
}

module.exports.doSettingsEmail = (req, res, next) => {
    function renderWithErrors(error) {
        res.status(400).render('user/settings', {
            error: error,
            user: req.body,
        })
    }

    helper.checkEmailExists(req.body.email).then((user) => {
        if (user[0] || user[1]) {
            renderWithErrors({ email: 'Ya existe un usuario con este email' })
        } else {
            const newToken = uuidv4()
            User.findOneAndUpdate(
                { _id: req.currentUser.id },
                { token: newToken, active: false, email: req.body.email },
                { runValidators: true, useFindAndModify: false }
            )
                .then(() => {
                    mailer.sendUpdateEmail(req.body.email, newToken)
                    req.logout()
                    res.render('user/login')
                })
                .catch((e) => {
                    if (e instanceof mongoose.Error.ValidationError) {
                        renderWithErrors(e.errors)
                    } else {
                        next(e)
                    }
                })
        }
    })
}

module.exports.activateNewEmail = (req, res, next) => {
    const { token } = req.params
    helper.activateFromEmail(
        token,
        'user/login',
        'Email verificado correctamente. Ya puedes iniciar sesión',
        '/',
        res,
        next
    )
}

module.exports.doSettingsPassword = (req, res, next) => {
    function renderWithErrors(error) {
        res.status(400).render('user/settings', {
            error: error,
            user: req.body,
        })
    }

    const newToken = uuidv4()
    User.findOneAndUpdate(
        { _id: req.currentUser.id },
        { token: newToken, active: false },
        { runValidators: true, useFindAndModify: false }
    )
        .then((user) => {
            if (
                req.currentUser.social.google ||
                req.currentUser.social.facebook
            ) {
                mailer.sendChangePassEmailSocial(
                    req.currentUser.email,
                    newToken
                )
            } else {
                mailer.sendChangePassEmail(req.currentUser.email, newToken)
            }
            req.logout()
            res.redirect('/')
        })
        .catch((e) => {
            if (e instanceof mongoose.Error.ValidationError) {
                renderWithErrors(e.errors)
            } else {
                next(e)
            }
        })
}

module.exports.activateInAction = (req, res, next) => {
    const { token } = req.params
    helper.activateFromEmail(
        token,
        'user/inaction',
        'Email verificado correctamente. Ya puedes editar la contraseña',
        '/',
        res,
        next
    )
}

module.exports.doTheAction = (req, res, next) => {
    function renderWithErrors(error) {
        res.status(400).render('user/inaction', {
            error,
            user: req.body,
        })
    }

    if (req.body.newPassword !== req.body.passwordRepeat) {
        renderWithErrors('Las contraseñas no coinciden')
    } else if (req.body.newPassword.length < 6) {
        renderWithErrors('La contraseña debe tener al menos 6 caracteres')
    } else {
        passport.authenticate('local-auth', (error, user, validations) => {
            if (error) {
                next(error)
            } else if (!user) {
                renderWithErrors(validations.error)
            } else {
                req.login(user, (loginErr) => {
                    if (!loginErr) {
                        User.findOneAndUpdate(
                            { email: req.body.email },
                            { password: req.body.newPassword },
                            { runValidators: true, useFindAndModify: false }
                        )
                            .then(() => {
                                res.redirect('/')
                            })
                            .catch((e) => {
                                if (
                                    e instanceof mongoose.Error.ValidationError
                                ) {
                                    renderWithErrors(e.errors)
                                    req.logout()
                                } else {
                                    req.logout()
                                    next(e)
                                }
                            })
                    } else {
                        next(loginErr)
                    }
                })
            }
        })(req, res, next)
    }
}

module.exports.activateInActionSocial = (req, res, next) => {
    const { token } = req.params
    helper.activateFromEmail(
        token,
        'user/inaction-social',
        'Email verificado correctamente',
        '/',
        res,
        next
    )
}

module.exports.doTheActionSocial = (req, res, next) => {
    function renderWithErrors(errors) {
        res.status(400).render('user/inaction-social', {
            error: errors,
            user: req.body,
        })
    }

    if (req.body.newPassword !== req.body.passwordRepeat) {
        renderWithErrors('Las contraseñas no coinciden')
    } else if (req.body.newPassword.length < 6) {
        renderWithErrors('La contraseña debe tener al menos 6 caracteres')
    } else {
        User.findOneAndUpdate(
            { email: req.body.email },
            { password: req.body.newPassword },
            { runValidators: true, useFindAndModify: false }
        )
            .then(() => {
                res.render('user/login', {
                    message:
                        'Ya puedes iniciar sesión con los cambios realizados',
                })
            })
            .catch((e) => {
                if (e instanceof mongoose.Error.ValidationError) {
                    renderWithErrors(e.errors)
                    req.logout()
                } else {
                    req.logout()
                    next(e)
                }
            })
    }
}

module.exports.doDelete = (req, res, next) => {
    /* Goneuser //
    .create(req.body) 
    .then(() => { */
    User.findOneAndDelete({ _id: req.currentUser.id })
        .then(() => {
            res.send(`<h1>Create view for -> Sorry to se you go</h1>`)
        })
        .catch((e) => next(e))
    /* })
    .catch((e) => next(e)) */
}
