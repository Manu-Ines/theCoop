const express = require('express')
const router = express.Router()
const orgController = require('../controllers/org.controller/org.controller')
const orgEditController = require('../controllers/org.controller/org.edit.controller')
const orgSettingController = require('../controllers/org.controller/org.settings.controller')
const secure = require('../middlewares/secure.middleware')
const upload = require('../configs/storage.config')

// Edit org ------------------------------------
router.get(
    '/org/edit-profile',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgEditController.editProfile
)
router.post(
    '/edit-profile-org',
    secure.checkRoles('ORG'),
    upload.single('profilePicture'),
    secure.isAuthenticated,
    orgEditController.doEditProfileOrg
)

// Settings org ---------------------------------
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
router.post(
    '/settings-delete-request',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgSettingController.petitionDelete
)
router.post(
    '/settings-cif',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgSettingController.doChangeCif
)
router.post(
    '/settings-b',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgSettingController.doChangeIban
)
router.get(
    '/org/settings',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgSettingController.settingsView
)

//-------------------------------------
// Public profile
router.get('/org/:id', orgController.publicProfile)

module.exports = router
