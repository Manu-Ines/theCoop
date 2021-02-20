require('dotenv').config()
const mongoose = require('mongoose');
const User = require('../models/User.model');
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

    User
        .findOne({ username: req.body.username })
        .then(user => {
            if(user){
                renderWithErrors({
                    username: 'Ya existe un usuario con este nombre de usuario'
                })
            } else {

                req.file 
                    ? req.body.profilePicture = `${process.env.HOST}/uploads/${req.file.filename}`
                    : req.body.profilePicture = `${process.env.HOST}/uploads/no-photo.jpg`

                User
                    .create(req.body)
                    .then(u => {
                        sendActivationEmail(u.email, u.token, u.username)
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
        })
}

module.exports.login = (req, res, next) => {
    res.render('user/login')
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
            next(error);
        } else if (!user) {
            res.status(400).render('user/login', { user: req.body, error: validations });
        } else {
            req.login(user, loginErr => {
                if (loginErr) next(loginErr)
                else res.redirect('/')
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
    const { token, username } = req.params
    if(token && username){
        User
            .findOneAndUpdate(
                { token: token, username: username }, 
                { active: true }, 
                { useFindAndModify: false })
            .then(user => {
                res.render('user/login', { user, message: "Felicidades, has activado tu cuenta. Ya puedes iniciar sesión" })
            })
            .catch(e => next(e))
    } else {
        res.redirect('/')
    }
}

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
    
    if(req.body.password === '' || req.body.password === undefined){
        delete req.body.password
    }

    if(req.body.name === "" || req.body.username === "" || req.body.email === ""){
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