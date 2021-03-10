const express = require('express')
const router = express.Router()
const assistanceController = require('../controllers/assistance.controller')
const secure = require('../middlewares/secure.middleware')
const upload = require('../configs/storage.config')

router.post ('/volunt/:slug',
    secure.checkRoles('USER'),
    upload.single('profilePicture'),
    secure.isAuthenticated,
    assistanceController.doAssistance
)
router.post('/volunt-drop-out/:slug',
    secure.checkRoles('USER'),
    upload.single('profilePicture'),
    secure.isAuthenticated,
    assistanceController.unDoAssistance
)

module.exports = router