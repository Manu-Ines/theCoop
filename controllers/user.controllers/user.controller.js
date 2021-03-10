require('dotenv').config()
const mongoose = require('mongoose')
const passport = require('passport')

const User = require('../../models/User.model')
const Donation = require('../../models/projects/Donation.model')
const Assistance = require('../../models/volunts/Assistance.model')
const mailer = require('../../configs/mailer.config')
const helper = require('../../helpers/email.helper')

/* ----------------
   - Registration
   - Activate account
   - Login/Logout
   - Profile
   - Users list
--------------------- */

module.exports.register = (req, res, next) => {
    res.render('user/register')
}

module.exports.doRegister = (req, res, next) => {
    function renderWithErrors(errors) {
        res.status(400).render('user/register', {
            errors: errors,
            user: req.body,
        })
    }

    helper.checkEmailExists(req.body.email).then((user) => {
        if (user[0] || user[1]) {
            renderWithErrors({
                email: 'Ya existe un usuario con este email',
            })
        } else {
            req.body.profilePicture = `https://res.cloudinary.com/dd5wme5hw/image/upload/v1615234631/express/default/placeholder-user_f2cmqk.jpg`

            User.create(req.body)
                .then((user) => {
                    mailer.sendActivationEmail(user.email, user.token)
                    res.redirect('/login')
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

module.exports.activate = (req, res, next) => {
    const { token } = req.params
    helper.activateFromEmail(
        token,
        'user/login',
        'Felicidades, has activado tu cuenta. Ya puedes iniciar sesión',
        '/',
        req,
        res,
        next
    )
}

module.exports.login = (req, res, next) => {
    res.render('user/login', { message: req.flash('info') })
}

module.exports.doLogin = (req, res, next) => {
    passport.authenticate('local-auth', (error, user, validations) => {
        if (error) {
            next(error)
        } else if (!user) {
            res.status(400).render('user/login', {
                user: req.body,
                error: validations.error,
            })
        } else {
            req.login(user, (loginErr) => {
                if (loginErr) next(loginErr)
                else res.redirect(req.body.currPath || '/')
            })
        }
    })(req, res, next)
}

module.exports.doLoginGoogle = (req, res, next) => {
    passport.authenticate('google-auth', (error, user, validations) => {
        if (error) {
            next(error)
        } else if (!user) {
            res.status(400).render('user/login', {
                user: req.body,
                error: validations,
            })
        } else {
            req.login(user, (loginErr) => {
                if (loginErr) next(loginErr)
                else res.redirect(req.flash('currPath') || '/')
            })
        }
    })(req, res, next)
}

module.exports.doLoginFacebook = (req, res, next) => {
    passport.authenticate('facebook-auth', (error, user, validations) => {
        if (error) {
            next(error)
        } else if (!user) {
            res.status(400).render('user/login', {
                user: req.body,
                error: validations,
            })
        } else {
            req.login(user, (loginErr) => {
                if (loginErr) next(loginErr)
                else res.redirect(req.flash('currPath') || '/')
            })
        }
    })(req, res, next)
}

module.exports.profile = (req, res, next) => {
    Promise.all([
        Donation.find({ donator: req.currentUser.id, paid: true }).populate(
            'project'
        ),
        Assistance.find({ assistant: req.currentUser.id }).populate('volunt'),
    ])
        .then((contributions) => {
            res.render('user/profile', {
                messages: req.flash('info'),
                donations: contributions[0],
                volunts: contributions[1],
            })
        })
        .catch(next)
}

module.exports.doLogout = (req, res, next) => {
    req.logout()
    res.redirect('/')
}

module.exports.usersList = (req, res, next) => {
    User.find()
        .then((users) => {
            res.render('user/list', { users })
        })
        .catch(next)
}

module.exports.sendInfoEmail = (req, res, next) => {
    
    let info = `${req.body.adress} - ${req.body.day} - ${req.body.time1} - ${req.body.time2} - ${req.body.slug}`

    mailer.sendInfoEmail(req.body.email, info)
    res.redirect(`volunt/${req.body.slug}`)
}
