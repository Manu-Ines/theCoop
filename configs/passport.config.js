require('dotenv').config()
const passport = require('passport')
const mongoose = require('mongoose')
const localStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/User.model')
const Org = require('../models/Org.model')

passport.serializeUser(function(user, next) {
    next(null, user.id);
});

passport.deserializeUser((id, next) => {
    Promise
        .all([User.findById(id), Org.findById(id)])
        .then(user => {
            user[0] ? next(null, user[0]) : next(null, user[1])
        })
        .catch(next);
});

passport.use('local-auth', new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, next) => {
        Promise.all([User.findOne({ email: email }), Org.findOne({ email: email })])
            .then(users => {
                console.log(users)
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
        Promise.all([ User.findOne({ $or: [{ email: email }, { 'social.google': googleID }]}), Org.findOne({ email: email })])
            .then(user => {
                if (!user[0] && !user[1]) {
                    User.create({
                            name,
                            email,
                            password: 'Aa1' + mongoose.Types.ObjectId(),
                            profilePicture,
                            social: {
                                google: googleID
                            },
                            active: true
                        })
                        .then(newUser => next(null, newUser))
                } else if (user[0]) {
                    next(null, user[0])
                } else {
                    next(null, null, 'No es posible iniciar sesión con Google si eres una organización')
                }
            })
            .catch(next)
        } else {
            next(null, null, 'Error conectando con Google OAuth')
        }
}))

passport.use('facebook-auth', new FacebookStrategy({
    clientID: process.env.F_CLIENT_ID,
    clientSecret: process.env.F_CLIENT_SECRET,
    callbackURL: process.env.F_REDIRECT_URI || '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails']
    }, (accessToken, refreshToken, profile, next) => {
    
    const facebookID = profile.id        
    const email = profile.emails[0].value
    const name = profile.displayName
    const profilePicture = `${process.env.HOST}/uploads/no-photo.jpg`

    if (facebookID) {
        Promise.all([ User.findOne({ $or: [{ email: email }, { 'social.facebook': facebookID }]}), Org.findOne({ email: email })])
            .then(user => {
                if (!user[0] && !user[1]) {
                    User.create({
                            name,
                            email,
                            password: 'Aa1' + mongoose.Types.ObjectId(),
                            profilePicture,
                            social: {
                                facebook: facebookID
                            },
                            active: true
                        })
                        .then(newUser => next(null, newUser))
                } else if (user[0]) {
                    next(null, user[0])
                } else {
                    next(null, null, 'No es posible iniciar sesión con Facebook si eres una organización')
                }
            })
            .catch(next)
    } else {
        next(null, false, 'Error conectando con Facebook')
    } 
}))