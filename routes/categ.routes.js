const express = require('express')
const router = express.Router()
const categsController = require('../controllers/categs.controller')


router.get('/c/:categ', categsController.searchCateg)

module.exports = router