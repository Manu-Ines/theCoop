const User = require('../models/User.model');
const Org = require('../models/Org.model');

module.exports.checkEmailExists = (email) => {
    return Promise.all([User.findOne({ email }), Org.findOne({ email })])
}