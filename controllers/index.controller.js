const Projects = require('../models/projects/Project.model')
const Volunts = require('../models/volunts/Volunt.model')
const categs = require('../configs/categs.config')

module.exports.index = (req, res, next) => {
    Promise.all([
        Projects.find({ completed: false })
            .limit(9)
            .populate('owner')
            .populate('donations'),
        Volunts.find({ completed: false })
            .limit(9)
            .populate('owner')
            .populate('assistance'),
    ])
        .then((data) => {
            data[0].map((obj) => {
                obj.money = obj.donations
                    .filter((d) => d.paid)
                    .reduce((acc, cur) => {
                        return (acc += cur.contribution)
                    }, 0)
                obj.percent = (obj.money * 100) / obj.sum
                return obj
            })

            data[1].map((obj) => {
                obj.people = obj.assistance.length
                obj.percent = (obj.people * 100) / obj.assistants
                return obj
            })

            res.render('index', {
                messages: req.flash('info'),
                projects: data[0],
                volunts: data[1],
                categs: categs,
            })
        })
        .catch(next)
}
