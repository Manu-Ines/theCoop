require('dotenv').config()

// DB CONFIG
require('./configs/db.config')

// DEBUG
require('./configs/debug.config')

// EXPRESS APP
const express = require('express')
const app = express()

// CONFIGURATIONS
require('./configs/passport.config')
require('./configs/middleware.config')(app)
require('./configs/hbs.config')
require('./configs/views.config')(app)
require('./configs/locals.config')(app)

// RUTAS
const routes = require('./routes/index.routes')
app.use('/', routes)

// EXPORTAR APP PARA USARLO EN BIN/WWW
module.exports = app
