require('dotenv').config()
const mongoose = require('mongoose')
const Org = require('../models/Org.model')
const User = require('../models/User.model')
const { sendActivationEmail } = require('../configs/mailer.config')
const passport = require('passport')

