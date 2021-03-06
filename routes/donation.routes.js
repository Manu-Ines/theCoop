const express = require('express')
const router = express.Router()
const donationController = require('../controllers/donation.controller')
const secure = require('../middlewares/secure.middleware')
const upload = require('../configs/storage.config')
const bodyParser = require('body-parser')

// Stripe Payments
router.post(
    '/create-checkout-session',
    secure.checkRoles('USER'),
    secure.isAuthenticated,
    donationController.createStripeCheckOut
)

router.post(
    '/stripeHook',
    express.raw({ type: 'application/json' }),
    donationController.stripeHook
)

module.exports = router
