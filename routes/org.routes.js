const express = require('express')
const router = express.Router()
const orgEditController = require('../controllers/org.controller/org.edit.controller')
const orgSettingController = require('../controllers/org.controller/org.settings.controller')
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
router.get ('/org/settings',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgSettingController.settingsView
)
router.post(
    '/settings-org-e',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgSettingController.doSettingsEmailOrg
)
router.get(
    '/activate-org-email/:token',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgSettingController.activateNewEmailOrg
)
router.get(
    '/settings-delete-request',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgSettingController.petitionDeleteView
)
router.post(
    '/settings-delete-request',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgSettingController.petitionDelete
)
router.get(
    '/settings-cif',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgSettingController.changeCifView
)
router.post(
    '/settings-cif',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgSettingController.doChangeCif
)
router.get(
    '/settings-b',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgSettingController.changeIbanView
)
router.post(
    '/settings-b',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgSettingController.doChangeIban
)

module.exports = router