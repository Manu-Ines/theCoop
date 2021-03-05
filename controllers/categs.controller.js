const Projects = require('../models/projects/Project.model')
const Volunts = require('../models/volunts/Volunt.model')


module.exports.searchCateg = (req, res, next) => {
    console.log(req.params.categ)
    Promise.all([
        Projects.find({ categs: req.params.categ }).populate('owner'), 
        Volunts.find({ categs: req.params.categ }).populate('owner')
    ])
    .then((segments) => {
        res.render('byCateg', { projects: segments[0], volunts: segments[1], categ: req.params.categ})
    })
    .catch(next) 
}
