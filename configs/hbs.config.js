require('dotenv').config()
const hbs = require('hbs')
const { join } = require('path')
const CryptoJS = require('crypto-js')

hbs.registerPartials(join(__dirname, '..', 'views', 'partials'))

// Comprobar si es organizacion
hbs.registerHelper('isOrg', function (val, options) {
    return val === 'ORG' ? options.fn() : options.inverse()
})

// Comprobar si es user
hbs.registerHelper('isUser', function (val, options) {
    return val === 'USER' ? options.fn() : options.inverse()
})

// Code
hbs.registerHelper('decrypt', function (val) {
    let bytes = CryptoJS.AES.decrypt(val, process.env.ENCRYPT_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
})

hbs.registerHelper('bankAcc', function (val) {
    let bytes = CryptoJS.AES.decrypt(val, process.env.ENCRYPT_KEY)
    let decryptedText = bytes.toString(CryptoJS.enc.Utf8)

    return '••••' + decryptedText.slice(20)
})
