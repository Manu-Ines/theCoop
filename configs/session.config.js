require('dotenv').config()
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const mongoose = require('mongoose')
const MongoStore = connectMongo(expressSession)

const SESSION_SECRET = process.env.SESSION_SECRET
const SESSION_SECURE = process.env.SESSION_SECURE === 'true' ? true : false
const SESSION_MAX_AGE = Number(process.env.SESSION_MAX_AGE) || 3600000

const session = expressSession({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: SESSION_SECURE,
        httpOnly: true,
        maxAge: SESSION_MAX_AGE,
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: SESSION_MAX_AGE,
    }),
})

module.exports = session
