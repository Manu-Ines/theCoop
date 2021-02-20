const hbs = require('hbs');
const { join } = require('path');

hbs.registerPartials(join(__dirname, '..', 'views', 'partials'))