const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const secure = require('../middlewares/secure.middleware')
const passport = require('passport')
const upload = require('../configs/storage.config')

/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

// User routes
router.get('/register', secure.isNotAuthenticated, userController.register)
router.post('/register', secure.isNotAuthenticated, upload.single('profilePicture'), userController.doRegister)
router.get('/login', secure.isNotAuthenticated, userController.login)
router.post('/login', secure.isNotAuthenticated, userController.doLogin)
router.get('/profile', secure.isAuthenticated, userController.profile)
router.get('/logout', secure.isAuthenticated, userController.doLogout)
router.get('/activate/:token', secure.isNotAuthenticated, userController.activate);
router.get('/edit-profile', secure.isAuthenticated, userController.editProfile)
router.post('/edit-profile', secure.isAuthenticated, upload.single('profilePicture'), userController.doEditProfile)

// Google auth
router.get('/authenticate/google', passport.authenticate('google-auth', { scope: [ 'email', 'profile' ] }))
router.get('/authenticate/google/cb', userController.doLoginGoogle)

// Admin routes
router.get('/users/list', secure.checkRoles('ADMIN'), secure.isActive, userController.usersList)

module.exports = router;
