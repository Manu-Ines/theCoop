const mongoose = require('mongoose')

const assistanceSchema = new mongoose.Schema({})

const Assistance = mongoose.model('Assistance', assistanceSchema)
module.exports = Assistance