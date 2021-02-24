const express = require('express')
const router = express.Router()
const orgEditController = require('../controllers/org.controller/org.edit.controller')
const secure = require('../middlewares/secure.middleware')
const upload = require('../configs/storage.config')

router.get ('/org/edit-profile',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgEditController.editProfile
)
router.post ('/edit-profile-org',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgEditController.doEditProfile
)

module.exports = router