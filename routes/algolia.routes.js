const express = require('express')
const router = express.Router()
const algoliaController = require('../controllers/algolia.controller')

router.get('/indexProjects', algoliaController.indexProjects)
router.get('/indexVolunts', algoliaController.indexVolunts)

module.exports = router
