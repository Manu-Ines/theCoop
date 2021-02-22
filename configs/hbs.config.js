const hbs = require('hbs')
const { join } = require('path')

hbs.registerPartials(join(__dirname, '..', 'views', 'partials'))

// Comprobar si es organizacion
hbs.registerHelper('isOrg', function (val, options) {
    return val === 'ORG' ? options.fn() : options.inverse()
})

// Comprobar si es user
hbs.registerHelper('isUser', function (val, options) {
    return val === 'USER' ? options.fn() : options.inverse()
})
