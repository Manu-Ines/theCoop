const index = require('../routes/index.routes')
const users = require('../routes/user.routes')
const orgs = require('../routes/org.routes')
const projects = require('../routes/project.routes')
const donations = require('../routes/donation.routes')

module.exports = (app) => {
    app.use('/', index)
    app.use('/', users)
    app.use('/', orgs)
    app.use('/', projects)
    app.use('/', donations)
}
