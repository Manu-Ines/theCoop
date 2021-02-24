require('dotenv').config()
const mongoose = require('mongoose');
const passport = require('passport')
const User = require('../models/User.model');
const Org = require('../models/Org.model');
const { sendActivationEmail } = require("../configs/mailer.config")

module.exports.register = (req, res, next) => {
    res.render('user/register')
}

module.exports.doRegister = (req, res, next) => {

    function renderWithErrors(errors) {
        res.status(400).render('user/register', {
            errors: errors,
            user: req.body
        })
    }

    Promise.all([User.findOne({ email: req.body.email }), Org.findOne({ email: req.body.email })])
        .then(user => {
            if(user[0] || user[1]){
                renderWithErrors({
                    email: 'Ya existe un usuario con este email'
                })
            } else {
                req.file 
                    ? req.body.profilePicture = `${process.env.HOST}/uploads/${req.file.filename}`
                    : req.body.profilePicture = `${process.env.HOST}/uploads/no-photo.jpg`

                User
                    .create(req.body)
                    .then(u => {
                        sendActivationEmail(u.email, u.token)
                        res.redirect('/login')
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

module.exports.login = (req, res, next) => {
    res.render('user/login', { message: req.flash('info') })
}

module.exports.doLogin = (req, res, next) => {
    passport.authenticate('local-auth', (error, user, validations) => {
        if (error) {
            next(error);
        } else if (!user) {
            res.status(400).render('user/login', { user: req.body, error: validations.error });
        } else {
            req.login(user, loginErr => {
                if (loginErr) next(loginErr)
                else res.redirect('/')
            })
        }
    })(req, res, next);
}

module.exports.doLoginGoogle = (req, res, next) => {
    passport.authenticate('google-auth', (error, user, validations) => {
        if (error) {
            next(error)
        } else if (!user) {
            res.status(400).render('user/login', { user: req.body, error: validations })
        } else {
            req.login(user, loginErr => {
                if (loginErr) next(loginErr)
                else res.redirect('/') // TODO: tras redirect hay que refresh para que identifique al user
            })
        }
    })(req, res, next)
}

module.exports.doLoginFacebook = (req, res, next) => {
    passport.authenticate('facebook-auth', (error, user, validations) => {
        if (error) {
            next(error);
        } else if (!user) {
            res.status(400).render('user/login', { user: req.body, error: validations });
        } else {
            req.login(user, loginErr => {
                if (loginErr) next(loginErr)
                else res.redirect('/') // TODO: "" linea 78
            })
        }
    })(req, res, next)
}

module.exports.profile = (req, res, next) => {
    res.render('user/profile', { messages: req.flash('info') })
}

module.exports.doLogout = (req, res, next) => {
    req.logout()
    res.redirect('/')
}

module.exports.activate = (req, res, next) => {
    const { token } = req.params
    if(token){
        Promise
            .all([User.findOneAndUpdate({ token: token }, { active: true, token: null }, { useFindAndModify: false }), Org.findOneAndUpdate({ token: token }, { active: true }, { useFindAndModify: false })])
            .then(user => {
                let userType = user[0] ? 0 : 1
                res.render('user/login', { user: user[userType], message: "Felicidades, has activado tu cuenta. Ya puedes iniciar sesión" })
            })
            .catch(e => next(e))
    } else {
        res.redirect('/')
    }
}

// Edit profile - Name, Picture, Visibility
module.exports.editProfile = (req, res, next) => {
    res.render('user/edit')
}

module.exports.doEditProfile = (req, res, next) => {
    function renderWithErrors(error) {
        res.status(400).render('user/edit', {
            error: error,
            user: req.body
        })
    }

    if(req.file) { req.body.profilePicture = req.file.path }
    if (!req.body.visibility) { req.body.visibility = false }
    if (req.body.visibility) {
        req.body.visibility === 'on' ?  req.body.visibility = true : req.body.visibility = false
    }

    if(req.body.name === ""){
        renderWithErrors('Campo obligatorio')
    } else {
        User
            .findOneAndUpdate({ _id: req.currentUser.id }, req.body, { runValidators: true, useFindAndModify: false })
            .then(() => {
                res.redirect('user/profile')
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

// Settings - Email, password, métodos de pago
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
    Promise.all([User.findOne({ email: req.body.email }), Org.findOne({ email: req.body.email })])
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
    if(token){
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
    if(token){
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
                        // TODO: Modelo user eliminar Max 50 - al update no me deja (No puedo modificar modelos desde esta rama)
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

}

module.exports.doDelete = (req, res, next) => {
    /* InactivatedUser // TODO: Model why?
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

module.exports.usersList = (req, res, next) => {
    User
        .find()
        .then(users => {
            res.render('user/list', { users })
        })
        .catch(next)
}