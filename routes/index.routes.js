const express = require('express')
const router = express.Router()
const passport = require('passport')
const userController = require('../controllers/user.controller')
const orgController = require('../controllers/org.controller')
const secure = require('../middlewares/secure.middleware')
const upload = require('../configs/storage.config')

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index', { messages: req.flash('info') })
})

// User routes ===================================================================
router.get('/register', secure.isNotAuthenticated, userController.register)
router.post(
    '/register',
    secure.isNotAuthenticated,
    upload.single('profilePicture'),
    userController.doRegister
)
router.get('/login', secure.isNotAuthenticated, userController.login)
router.post('/login', secure.isNotAuthenticated, userController.doLogin)

// Activated user routes ----------------------------------------------------------
router.get(
    '/user/profile',
    secure.checkRoles('USER'),
    secure.isAuthenticated,
    userController.profile
)
router.get('/logout', secure.isAuthenticated, userController.doLogout)
router.get(
    '/activate/:token',
    secure.isNotAuthenticated,
    userController.activate
)
router.get(
    '/activate-email/:token',
    secure.isNotAuthenticated,
    userController.activateNewEmail
)
router.get(
    '/change-inaction/:token',
    secure.isNotAuthenticated,
    userController.activateInAction
)
router.get(
    '/user/edit-profile',
    secure.checkRoles('USER'),
    secure.isAuthenticated,
    userController.editProfile
)
router.post(
    '/edit-profile',
    secure.isAuthenticated,
    upload.single('profilePicture'),
    userController.doEditProfile
)
router.get(
    '/user/settings',
    secure.checkRoles('USER'),
    secure.isAuthenticated,
    userController.settings
)
router.post(
    '/settings-e',
    secure.isAuthenticated,
    userController.doSettingsEmail
)
router.post(
    '/settings-p',
    secure.isAuthenticated,
    userController.doSettingsPassword
)
router.post(
    '/do-the-action',
    secure.isNotAuthenticated,
    userController.doTheAction
)
router.post(
    '/settings-delete-account',
    secure.isAuthenticated,
    userController.doDelete
)
router.post(
    '/settings-b',
    secure.isAuthenticated,
    userController.doSettingsBank
)

// Google auth
router.get(
    '/authenticate/google',
    passport.authenticate('google-auth', { scope: ['email', 'profile'] })
)
router.get('/authenticate/google/cb', userController.doLoginGoogle)

// Facebook auth
router.get(
    '/auth/facebook',
    passport.authenticate('facebook-auth', { scope: 'email' })
)
router.get('/auth/facebook/callback', userController.doLoginFacebook)

// Org routes =======================================================================
router.get('/org/register', secure.isNotAuthenticated, orgController.register)
router.post(
    '/org/register',
    secure.isNotAuthenticated,
    upload.single('profilePicture'),
    orgController.doRegister
)

// Active org routes -----------------------------------------------------------------
router.get(
    '/org/profile',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgController.profile
)
router.get(
    '/org/edit-profile',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    orgController.editProfile
)

module.exports = router