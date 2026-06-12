import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro': "price_1Tgam8EQHDJ5kzpvLV2vrySa",
    "seeker_premium" : "price_1Tgoq2EQHDJ5kzpvSXKsOGjv",
    "recruiter_growth" : "price_1TgoqvEQHDJ5kzpvKqfPRXSN",
    "recruiter_enterprise" : "price_1TgorZEQHDJ5kzpvhR4ug0kd"
}