module.exports.isAuthenticated = (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect('/login')
}

module.exports.isNotAuthenticated = (req, res, next) => {
    req.isAuthenticated() ? res.redirect('/') : next()
}

// Sólo para usuarios activos
module.exports.isActive = (req, res, next) => {
    req.user.active ? next() : res.redirect('/')
}

// Restringir por roles
module.exports.checkRoles = (role) => (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) {
        return next()
    } else {
        req.flash('flashMessage', 'No tienes permiso para acceder a la página')
        res.redirect('/')
    }
}
