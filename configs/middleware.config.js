const logger = require('morgan')
const express = require('express')
const { join } = require('path')
const passport = require('passport')
const session = require('./session.config')
const flash = require('connect-flash')
const favicon = require('serve-favicon')
const compression = require('compression') // Gzip compression
const helmet = require('helmet')

module.exports = (app) => {
    app.use(express.static(join(__dirname, '..', 'public')))
    app.use(logger('dev'))
    app.use((req, res, next) => {
        if (req.originalUrl === '/stripeHook') {
            next()
        } else {
            express.json()(req, res, next)
        }
    })
    app.use(session)
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(favicon(join(__dirname, '..', 'public', 'images', 'favicon.ico')))
    app.use((req, res, next) => {
        req.currentUser = req.user
        res.locals.currentUser = req.user
        next()
    })
    app.use(flash())
    app.use((req, res, next) => {
        res.locals.flashMessage = req.flash('flashMessage')
        res.locals.flashError = req.flash('flashError')
        next()
    })
    app.use(compression())
    app.use(helmet({ contentSecurityPolicy: false }))
}
