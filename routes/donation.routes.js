const express = require('express')
const router = express.Router()
const donationController = require('../controllers/donation.controller')
const secure = require('../middlewares/secure.middleware')
const upload = require('../configs/storage.config')

router.post ('/donation/:slug',
    secure.checkRoles('USER'),
    upload.single('profilePicture'),
    secure.isAuthenticated,
    donationController.doDonation
)

module.exports = router