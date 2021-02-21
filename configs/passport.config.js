require('dotenv').config()
const passport = require('passport');
const mongoose = require('mongoose');
const localStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const User = require('../models/User.model');
const Org = require('../models/Org.model');

passport.serializeUser(function(user, next) {
    next(null, user.id);
});

passport.deserializeUser((id, next) => {
    User
        .findById(id)
        .then(user => next(null, user))
        .catch(next);
});

passport.use('local-auth', new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, next) => {
        Promise.all([User.findOne({ email: email }), Org.findOne({ email: email })])
            .then(users => {
                if(!users[0] && !users[1]){
                    next(null, false, { error: 'El correo electrónico o la contraseña no son correctos' })
                } else {
                    let userType = users[0] ? 0 : 1

                    users[userType].checkPassword(password)
                    .then(match => {
                        if(match && users[userType].active){
                            next(null, users[userType])
                        } else if (match && !users[userType].active) {
                            next(null, false, { error: 'Tu cuenta no está activa, revisa tu email' })
                        } else {
                            next(null, false, { error: "El correo electrónico o la contraseña no son correctos" })
                        }
                    })
                    .catch(next)
                }

            })
            .catch(next)
}))

passport.use('google-auth', new GoogleStrategy({
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SECRET,
    callbackURL: process.env.G_REDIRECT_URI || '/authenticate/google/cb'
    }, (accessToken, refreshToken, profile, next) => {

    const googleID = profile.id
    const email = profile.emails[0] ? profile.emails[0].value : undefined;
    const name = `${profile.name.givenName} ${profile.name.familyName}`
    const profilePicture = profile.picture || `${process.env.HOST}/uploads/no-photo.jpg`

    if (googleID && email) {
        User.findOne({ $or: [{ email: email }, { 'social.google': googleID }]})
        .then(user => {
            if (!user) {
                const newUserInstance = new User({
                    name,
                    email,
                    password: 'Aa1' + mongoose.Types.ObjectId(),
                    profilePicture,
                    social: {
                        google: googleID
                    },
                    active: true
                })
    
                return newUserInstance.save()
                    .then(newUser => next(null, newUser))
            } else {
                next(null, user)
            }
        })
        .catch(next)
    } else {
        next(null, null, { error: 'Error conectando con Google OAuth' })
    }
}))