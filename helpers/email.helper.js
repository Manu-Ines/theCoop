const User = require('../models/User.model')
const Org = require('../models/Org.model')

module.exports.checkEmailExists = (email) => {
    return Promise.all([User.findOne({ email }), Org.findOne({ email })])
}

module.exports.activateFromEmail = ( token, view, message, redirect, req, res, next) => {
    if (token) {
        Promise.all([
            User.findOneAndUpdate(
                { token: token },
                { active: true },
                { useFindAndModify: false }
            ),
            Org.findOneAndUpdate(
                { token: token },
                { active: true },
                { useFindAndModify: false }
            ),
        ])
            .then((user) => {
                let userType = user[0] ? 0 : 1
                res.render(view, { user: user[userType], message: message })
            })
            .catch((e) => next(e))
    } else {
        res.redirect(redirect)
    }
}
