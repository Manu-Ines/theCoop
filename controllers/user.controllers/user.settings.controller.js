require('dotenv').config()
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../../models/User.model')
const Org = require('../../models/Org.model')
const { sendUpdateEmail } = require("../../configs/mailer.config")
const { sendChangePassEmail } = require("../../configs/mailer.config")
const { v4: uuidv4 } = require('uuid')
const { login } = require('./user.controller')

/* ----------------
   - Email
   - Password
   -* Métodos de pago
   TODO:
   -* const activationToken
   -* Corregir max 50 Modelo User (no puedo desde esta rama)
   -* Errors de passord change
   -* Modelo Goneuser
--------------------- */

module.exports.settings = (req, res, next) => {
    res.render('user/settings')
}

module.exports.doSettingsEmail = (req, res, next) => {
    function renderWithErrors(error) {
        res.status(400).render('user/settings', {
            error: error,
            user: req.body
        })
    }

    Promise
    .all([User.findOne({ email: req.body.email }), Org.findOne({ email: req.body.email })])
    .then(user => {
        if(user[0] || user[1]){
            renderWithErrors({
                email: 'Ya existe un usuario con este email'
            })
        } else {
            const newToken = uuidv4()
            User
                .findOneAndUpdate({ _id: req.currentUser.id }, { token: newToken, active: false, email: req.body.email }, { runValidators: true, useFindAndModify: false })
                .then(() => {
                    sendUpdateEmail(req.body.email, newToken)
                    req.logout()
                    res.render('user/login')
                })
                .catch(e => {
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
    if (token) {
        Promise
        .all([User.findOneAndUpdate({ token: token }, { active: true, token: null }, { useFindAndModify: false }), Org.findOneAndUpdate({ token: token }, { active: true }, { useFindAndModify: false })])
        .then(user => {
            let userType = user[0] ? 0 : 1
            res.render('user/login', { user: user[userType], message: "Email verificado correctamente. Ya puedes iniciar sesión" })
        })
        .catch(e => next(e))
    } else {
        res.redirect('/')
    }
}

module.exports.doSettingsPassword = (req, res, next) => {
    function renderWithErrors(error) {
        res.status(400).render('user/settings', {
            error: error,
            user: req.body
        })
    }

    const newToken = uuidv4()

    User
    .findOneAndUpdate({ _id: req.currentUser.id }, { token: newToken, active: false }, { runValidators: true, useFindAndModify: false })
    .then((user) => {
        sendChangePassEmail(req.currentUser.email, newToken)
        req.logout()
        res.redirect('/')
    })
    .catch(e => {
        if (e instanceof mongoose.Error.ValidationError) {
            renderWithErrors(e.errors)
        } else {
            next(e)
        }
    })      
}

module.exports.activateInAction = (req, res, next) => {
    const { token } = req.params
    if (token) {
        Promise
        .all([User.findOneAndUpdate({ token: token }, { active: true, token: null }, { useFindAndModify: false }), Org.findOneAndUpdate({ token: token }, { active: true }, { useFindAndModify: false })])
        .then(user => {
            res.render('user/inaction', { message: "Email verificado correctamente. Ya puedes editar la contraseña" })
        })
        .catch(e => next(e))
    } else {
        res.redirect('/')
    }
}

module.exports.doTheAction = (req, res, next) => {
    function renderWithErrors(error) {
        res.status(400).render('user/inaction', {
            error: error,
            user: req.body
        })
    }
    passport.authenticate('local-auth', (error, user, validations) => {
        if (error) {
            next(error);
        } else if (!user) {
            res.status(400).render('user/inaction', { user: req.body, error: validations.error })
        } else if (req.body.newPassword !== req.body.passwordRepeat) {
            res.status(400).render('user/inaction', { user: req.body, error: 'Las contraseñas no coinciden' });
        } else {
            req.login(user, loginErr => {
                if (!loginErr) {
                    User
                    .findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword }, { runValidators: true, useFindAndModify: false })
                    .then(() => {
                        res.redirect('/')
                    })
                    .catch(e => {
                        if (e instanceof mongoose.Error.ValidationError) {
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

module.exports.doSettingsBank = (req, res, next) => {
    // TODO
}

module.exports.doDelete = (req, res, next) => {
    /* Goneuser //
    .create(req.body) 
    .then(() => { */
        User
            .findOneAndDelete({ _id: req.currentUser.id  })
            .then(() => {
                res.send(`<h1>Create view for -> Sorry to se you go</h1>`)
            })
            .catch((e) => next(e))
    /* })
    .catch((e) => next(e)) */
}