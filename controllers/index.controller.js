const Projects = require('../models/projects/Project.model')

module.exports.index = (req, res, next) => {
    Promise.all([
        Projects.find({ completed: false }).limit(9).populate('owner'),
    ])
        .then((data) => {
            res.render('index', {
                messages: req.flash('info'),
                projects: data[0],
            })
        })
        .catch(next)
}
