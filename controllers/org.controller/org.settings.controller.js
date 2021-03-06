require('dotenv').config()
const mongoose = require('mongoose')
const passport = require('passport')
const { v4: uuidv4 } = require('uuid')
const CryptoJS = require('crypto-js')

const Org = require('../../models/Org.model')
const Project = require('../../models/projects/Project.model')
const Volunt = require('../../models/volunts/Volunt.model')
const mailer = require('../../configs/mailer.config')
const helper = require('../../helpers/email.helper')

/* ----------------
   * Email
   * Contraseña
   * CIF
   * Document
   * IBAN
   * Solicitud de eliminación
   * My area
--------------------- */

module.exports.settingsView = (req, res, next) => {
    res.render('org/settings')
}

module.exports.doSettingsEmailOrg = (req, res, next) => {
    function renderWithErrors(error) {
        res.status(400).render('org/settings', {
            error: error,
            user: req.body,
        })
    }

    helper.checkEmailExists(req.body.email).then((org) => {
        if (org[0] || org[1]) {
            renderWithErrors({ email: 'Ya existe este email' })
        } else {
            const newToken = uuidv4()
            Org.findOneAndUpdate(
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

module.exports.activateNewEmailOrg = (req, res, next) => {
    const { token } = req.params
    helper.activateFromEmail(
        token,
        'user/login',
        'Email verificado correctamente. Ya puedes iniciar sesión',
        '/',
        req,
        res,
        next
    )
}

module.exports.petitionDelete = (req, res, next) => {
    // TODO: petición eliminar cuenta
    mailer.sendRequestDelete(
        'simielgarse@gmail.com',
        req.currentUser.id,
        req.body.reason
    )
    res.json({
        status: 200,
        data:
            'Se ha enviado la solicitud para eliminar la cuenta. Contactaremos con ustedes en 24/48h',
    })
}

module.exports.doChangeCif = (req, res, next) => {
    function renderWithErrors(error) {
        res.status(400).render('org/settings', {
            error: error,
            user: req.body,
        })
    }

    if (req.body.cif === '') {
        renderWithErrors('Campo obligatorio')
    } else {
        Org.findOneAndUpdate({ _id: req.currentUser.id }, req.body, {
            runValidators: true,
            useFindAndModify: false,
        })
            .then(() => {
                res.redirect('org/settings')
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

module.exports.doChangeIban = (req, res, next) => {
    function renderWithErrors(error) {
        res.status(400).render('org/settings', {
            error: error,
            user: req.body,
        })
    }

    let ibanEncrypted = CryptoJS.AES.encrypt(
        req.body.bank,
        process.env.ENCRYPT_KEY
    ).toString()

    Org.findOneAndUpdate(
        { _id: req.currentUser.id },
        { bank: ibanEncrypted },
        {
            runValidators: true,
            useFindAndModify: false,
        }
    )
        .then(() => {
            res.redirect('org/settings')
        })
        .catch((e) => {
            if (e instanceof mongoose.Error.ValidationError) {
                renderWithErrors(e.errors)
            } else {
                next(e)
            }
        })
}
