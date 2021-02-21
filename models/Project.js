const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project