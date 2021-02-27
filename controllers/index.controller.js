const Projects = require('../models/projects/Project.model')

module.exports.index = (req, res, next) => {
    Promise.all([Projects.find({}).limit(10).populate('owner')])
        .then((data) => {
            console.log(data)
            res.render('index', {
                messages: req.flash('info'),
                projects: data[0],
            })
        })
        .catch(next)
}
