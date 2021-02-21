const mongoose = require('mongoose')

const voluntSchema = new mongoose.Schema({})

const Volunt = mongoose.model('Volunt', voluntSchema)
module.exports = Volunt