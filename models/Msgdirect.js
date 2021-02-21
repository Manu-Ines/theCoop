const mongoose = require('mongoose')

const msgdirectSchema = new mongoose.Schema({})

const Msgdirect = mongoose.model('Msgdirect', msgdirectSchema)
module.exports = Msgdirect