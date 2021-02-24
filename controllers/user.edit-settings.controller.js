require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/User.model')
const Org = require('../models/Org.model')
const { sendUpdateEmail } = require("../configs/mailer.config")
const { sendChangePassEmail } = require("../configs/mailer.config")
const passport = require('passport')
const { v4: uuidv4 } = require('uuid')