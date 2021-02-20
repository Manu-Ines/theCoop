require('dotenv').config()
const passport = require('passport');
const mongoose = require('mongoose');
const localStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const User = require('../models/User.model');

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
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, next) => {
    User
        .findOne({ username: username })
        .then(user => {
            if(!user){
                next(null, false, { error: 'El correo electrónico o la contraseña no son correctos' })
            } else {
                user.checkPassword(password)
                    .then(match => {
                        if(match && user.active){
                            next(null, user)
                        } else if (match && !user.active) {
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

    // TODO: Revisar si queremos o no foto 
    const profilePicture = profile.picture || `${process.env.HOST}/uploads/no-photo.jpg`
    const username = name.split(' ').join('') + Math.floor((Math.random() * (99999 - 10 + 1)) + 10)

    if (googleID && email) {
        User.findOne({ $or: [
            { email: email },
            { 'social.google': googleID }
        ]})
        .then(user => {
            if (!user) {
            const newUserInstance = new User({
                name,
                username,
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