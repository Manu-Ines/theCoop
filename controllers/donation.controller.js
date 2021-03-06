require('dotenv').config()
const Donation = require('../models/projects/Donation.model')
const Project = require('../models/projects/Project.model')
const stripe = require('stripe')(process.env.SK_KEY)
const endpointSecret = process.env.END_POINT_SECRET

module.exports.createStripeCheckOut = (req, res, next) => {
    req.body.quantity = req.body.quantity <= 0 ? 1 : req.body.quantity

    return stripe.checkout.sessions
        .create({
            customer_email: req.currentUser.email,
            submit_type: 'donate',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: req.body.projectTitle,
                            images: [req.body.projectImage],
                        },
                        unit_amount: req.body.quantity * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.HOST}/user/profile`,
            cancel_url: `${process.env.HOST}/project/${req.body.projectSlug}`,
        })
        .then((session) => {
            req.body.donator = req.currentUser.id
            req.body.project = req.body.projectId
            req.body.contribution = req.body.quantity
            req.body.stripeSession = session.id

            if (!req.body.anonymous) {
                req.body.anonymous = false
            }
            if (req.body.anonymous) {
                req.body.anonymous === 'on'
                    ? (req.body.anonymous = true)
                    : (req.body.anonymous = false)
            }

            Donation.create(req.body)
                .then(() => {
                    res.json({ id: session.id })
                })
                .catch(next)
        })
        .catch(next)
}

module.exports.stripeHook = (req, res, next) => {
    const sig = req.headers['stripe-signature']

    let event

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
    } catch (err) {
        console.error(err)
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object

        Donation.findOneAndUpdate(
            { stripeSession: session.id },
            { paid: true },
            { useFindAndModify: false }
        )
            .then((donation) => res.status(200).send(donation))
            .catch((e) => res.status(500).send(e))
    }
}
