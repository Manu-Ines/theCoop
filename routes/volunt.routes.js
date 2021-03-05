const express = require('express')
const router = express.Router()
const voluntController = require('../controllers/volunt.controller')
const secure = require('../middlewares/secure.middleware')
const upload = require('../configs/storage.config')

// Create new projects
router.get(
    '/volunt/create',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    voluntController.create
)

router.post(
    '/volunt/create',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    upload.single('image'),
    voluntController.doCreate
)

// Edit projects
router.get(
    '/volunt/edit/:slug',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    voluntController.edit
)

router.post(
    '/volunt/edit/:id',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    upload.single('image'),
    voluntController.doEdit
)

//Delete
router.post(
    '/delete-volunt/:id',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    upload.single('image'),
    voluntController.doDelete
)

// View Project
router.get('/volunt/:slug', voluntController.detail)

module.exports = router
