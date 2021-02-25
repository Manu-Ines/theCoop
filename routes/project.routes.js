const express = require('express')
const router = express.Router()
const projectController = require('../controllers/project.controller')
const secure = require('../middlewares/secure.middleware')
const upload = require('../configs/storage.config')

// Create new projects
router.get(
    '/project/create',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    projectController.create
)

router.post(
    '/project/create',
    secure.checkRoles('ORG'),
    secure.isAuthenticated,
    upload.single('image'),
    projectController.doCreate
)

// View Project
router.get('/project/:slug', projectController.detail)

module.exports = router
