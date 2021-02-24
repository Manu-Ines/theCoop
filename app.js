require('dotenv').config();

// DB CONFIG
require('./configs/db.config');

// DEBUG
require('./configs/debug.config');

// EXPRESS APP
const express = require('express');
const app = express();

// CONFIGURATIONS
require('./configs/passport.config');
require('./configs/middleware.config')(app);
require('./configs/hbs.config');
require('./configs/views.config')(app);
require('./configs/locals.config')(app);

// RUTAS
const index = require('./routes/index.routes')
const users = require('./routes/user.routes')
const orgs = require('./routes/org.routes')
app.use('/', index)
app.use('/', users)
app.use('/', orgs)


// EXPORTAR APP PARA USARLO EN BIN/WWW
module.exports = app;