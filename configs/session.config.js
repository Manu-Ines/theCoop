require('dotenv').config()
const expressSession = require('express-session')
const MongoStore = require('connect-mongo').default

const SESSION_SECRET = process.env.SESSION_SECRET
const SESSION_SECURE = process.env.SESSION_SECURE === 'true' ? true : false
const SESSION_MAX_AGE =
    Number(process.env.SESSION_MAX_AGE) || 720 * 60 * 60 * 1000

const session = expressSession({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: SESSION_SECURE,
        httpOnly: true,
        maxAge: SESSION_MAX_AGE,
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: SESSION_MAX_AGE,
    }),
})

module.exports = session
