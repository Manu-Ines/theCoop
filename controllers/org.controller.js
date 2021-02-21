require('dotenv').config()
const mongoose = require('mongoose');
const Org = require('../models/Org.model');
const { sendActivationEmail } = require("../configs/mailer.config");
const passport = require('passport');

module.exports.register = (req, res, next) => {
    res.render('org/register')
}

module.exports.doRegister = (req, res, next) => {

    function renderWithErrors(errors) {
        res.status(400).render('org/register', {
            errors: errors,
            user: req.body
        })
    }

    Org
        .findOne({ email: req.body.email })
        .then(org => {
            if(org){
                renderWithErrors({
                    email: 'Ya existe un usuario con este email'
                })
            } else {
                req.file 
                    ? req.body.profilePicture = `${process.env.HOST}/uploads/${req.file.filename}`
                    : req.body.profilePicture = `${process.env.HOST}/uploads/no-photo.jpg`

                Org
                    .create(req.body)
                    .then(u => {
                        sendActivationEmail(u.email, u.token)
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