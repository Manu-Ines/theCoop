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
        res.status(400).render('user/login', {
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

            const mailAndRedirect = () => {
                mailer.sendForgotPasswordEmail(user[userType].email, token)
                res.redirect('/')
            }

            if (userType === 0) {
                User.findOneAndUpdate(
                    { email: req.body.email },
                    { token: token },
                    { runValidators: true, useFindAndModify: false }
                )
                    .then(mailAndRedirect)
                    .catch(next)
            } else {
                Org.findOneAndUpdate(
                    { email: req.body.email },
                    { token: token },
                    { runValidators: true, useFindAndModify: false }
                )
                    .then(mailAndRedirect)
                    .catch(next)
            }
        }
    })
}

module.exports.activationForgotPassword = (req, res, next) => {
    const { token } = req.params

    Promise.all([User.findOne({ token }), Org.findOne({ token })]).then(
        (user) => {
            if (user[0] || user[1]) {
                res.render('user/reset-password', { token })
            } else {
                res.render('user/login')
            }
        }
    )
}

module.exports.resetPassword = (req, res, next) => {
    function renderWithErrors(error) {
        res.status(400).render('user/reset-password', {
            error,
            token: req.body.token,
        })
    }

    if (req.body.newPassword !== req.body.passwordRepeat) {
        renderWithErrors('Las contraseñas no coinciden')
    } else if (req.body.newPassword.length < 6) {
        renderWithErrors('La contraseña debe tener al menos 6 caracteres')
    } else {
        Promise.all([
            User.findOneAndUpdate(
                { token: req.body.token },
                { password: req.body.newPassword }
            ),
            Org.findOneAndUpdate(
                { token: req.body.token },
                { password: req.body.newPassword }
            ),
        ])
            .then((users) => {
                let user = users[0] ? users[0] : users[1]
                res.render('user/login', {
                    message: 'Ya puedes iniciar sesión',
                    user,
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
}
