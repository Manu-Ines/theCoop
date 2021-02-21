const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({})

const Donation = mongoose.model('Donation', donationSchema)
module.exports = Donation