const Projects = require('../models/projects/Project.model')
const Volunts = require('../models/volunts/Volunt.model')
const categs = require('../configs/categs.config')

module.exports.index = (req, res, next) => {
    Promise.all([
        Projects.find({ completed: false }).limit(9).populate('owner'),
        Volunts.find({ completed: false }).limit(9).populate('owner'),
    ])
        .then((data) => {
            res.render('index', {
                messages: req.flash('info'),
                projects: data[0],
                volunts: data[1],
                categs: categs
            })
        })
        .catch(next)
}
