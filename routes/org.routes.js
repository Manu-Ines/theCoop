const express = require('express')
const router = express.Router()
const orgEditController = require('../controllers/org.controller/org.edit.controller')
const secure = require('../middlewares/secure.middleware')
const upload = require('../configs/storage.config')

// Edit org ------------------------------------

router.get ('/org/edit-profile',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgEditController.editProfile
)
router.post ('/edit-profile-org',
    secure.checkRoles('ORG'),
    upload.single('profilePicture'),
    secure.isAuthenticated,
    orgEditController.doEditProfileOrg
)
// Settings org ---------------------------------

module.exports = router