const mongoose = require('mongoose')

const ratingsSchema = new mongoose.Schema({})

const Ratings = mongoose.model('Ratings', ratingsSchema)
module.exports = Ratings