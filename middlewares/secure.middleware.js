module.exports.isAuthenticated = (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect('/login')
}

module.exports.isNotAuthenticated = (req, res, next) => {
    req.isAuthenticated() ? res.redirect('/profile') : next()
}

// Sólo para usuarios activos
module.exports.isActive = (req, res, next) => {
    req.user.active ? next() : res.redirect('/profile')
}

// Restringir por roles
module.exports.checkRoles = role => (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) {
        return next();
    } else {
        req.flash('info', 'No tienes permiso')
        res.redirect('/login');
    }
};