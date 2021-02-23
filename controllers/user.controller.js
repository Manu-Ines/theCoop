require('dotenv').config()
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Org = require('../models/Org.model');
const { sendActivationEmail } = require("../configs/mailer.config");
const passport = require('passport');

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
            .all([User.findOneAndUpdate({ token: token }, { active: true }, { useFindAndModify: false }), Org.findOneAndUpdate({ token: token }, { active: true }, { useFindAndModify: false })])
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

    if(req.file){
        req.body.profilePicture = req.file.path
    }
}
// Settings - Email, password, métodos de pago
module.exports.settings = (req, res, next) => {
    res.send('View of settings')
}

module.exports.doSettings = (req, res, next) => {
    res.send('POST Settings')

    function renderWithErrors(error) {
        res.status(400).render('user/edit', {
            error: error,
            user: req.body
        })
    }
    if(req.body.password === '' || req.body.password === undefined){
        delete req.body.password
    }

    if(req.body.name === "" || req.body.email === ""){
        renderWithErrors('Debes rellenar todos los campos')
    } else {
        User
            .findOneAndUpdate({ _id: req.currentUser._id }, req.body, { useFindAndModify: false })
            .then(() => {
                res.redirect('/profile')
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

module.exports.usersList = (req, res, next) => {
    User
        .find()
        .then(users => {
            res.render('user/list', { users })
        })
        .catch(next)
}