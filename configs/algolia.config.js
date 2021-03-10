require('dotenv').config()
const algoliasearch = require('algoliasearch')

const client = algoliasearch(
    process.env.ALG_APP || 'U28QP2NJ27',
    process.env.ALG_KEY || '3f332b092a5a0db62961058d849f28f6'
)

module.exports = client
