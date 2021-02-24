const index = require('../routes/index.routes')
const users = require('../routes/user.routes')
const orgs = require('../routes/org.routes')

module.exports = (app) => {
    app.use('/', index)
    app.use('/', users)
    app.use('/', orgs)
}