const express = require('express')
const router = express.Router()
const userEditController = require('../controllers/user.controllers/user.edit.controller')
const userSettingsController = require('../controllers/user.controllers/user.settings.controller')
const secure = require('../middlewares/secure.middleware')
const upload = require('../configs/storage.config')

// Edit user ---------------------------------------------------------
router.get(
    '/user/edit-profile',
    secure.checkRoles('USER'),
    secure.isAuthenticated,
    userEditController.editProfile
)
router.post(
    '/edit-profile',
    secure.isAuthenticated,
    upload.single('profilePicture'),
    userEditController.doEditProfile
)
// Settigs user --------------------------------------------------------
router.get(
    '/user/settings',
    secure.checkRoles('USER'),
    secure.isAuthenticated,
    userSettingsController.settings
)
router.post(
    '/settings-e',
    secure.isAuthenticated,
    userSettingsController.doSettingsEmail
)
router.get(
    '/activate-email/:token',
    secure.isNotAuthenticated,
    userSettingsController.activateNewEmail
)
router.post(
    '/settings-p',
    secure.isAuthenticated,
    userSettingsController.doSettingsPassword
)
router.get(
    '/change-inaction/:token',
    secure.isNotAuthenticated,
    userSettingsController.activateInAction
)
router.post(
    '/do-the-action',
    secure.isNotAuthenticated,
    userSettingsController.doTheAction
)
router.post(
    '/settings-b',
    secure.isAuthenticated,
    userSettingsController.doSettingsBank
)
router.post(
    '/settings-delete-account',
    secure.isAuthenticated,
    userSettingsController.doDelete
)

module.exports = router