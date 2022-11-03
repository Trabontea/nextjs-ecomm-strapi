import Stripe from 'stripe'
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)
import { getSession, GetSession } from '@auth0/nextjs-auth0'

export default async function handler(req, res) {
  const session = getSession(req, res)
  const user = session?.user
  if (user) {
    const stripeId = user['http://localhost:3000/stripe_customer_id']
    if (req.method === 'POST') {
      try {
        // create Checkout Session
        const session = await stripe.checkout.sessions.create({
          submit_type: 'pay',
          mode: 'payment',
          customer: stripeId,
          payment_method_types: ['card'],
          shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'RO'],
          },
          allow_promotion_codes: true,
          shipping_options: [{ shipping_rate: 'shr_1LxGiDDMvKsdLMh6mDWE1NP9' }],
          line_items: req.body.map((item) => {
            console.log(item)
            return {
              price_data: {
                currency: 'ron',
                product_data: {
                  name: item.title,
                  images: [item.image.data.attributes.formats.thumbnail.url],
                },
                unit_amount: item.price * 100,
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity,
            }
          }),
          // Bring people to the success or failed page
          success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/canceled`,
        })
        res.status(200).json(session)
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message)
      }
    }
  } else {
    if (req.method === 'POST') {
      try {
        // create Checkout Session
        const session = await stripe.checkout.sessions.create({
          submit_type: 'pay',
          mode: 'payment',
          payment_method_types: ['card'],
          shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'RO'],
          },
          allow_promotion_codes: true,
          shipping_options: [{ shipping_rate: 'shr_1LxGiDDMvKsdLMh6mDWE1NP9' }],
          line_items: req.body.map((item) => {
            console.log(item)
            return {
              price_data: {
                currency: 'ron',
                product_data: {
                  name: item.title,
                  images: [item.image.data.attributes.formats.thumbnail.url],
                },
                unit_amount: item.price * 100,
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity,
            }
          }),
          // Bring people to the success or failed page
          success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/canceled`,
        })
        res.status(200).json(session)
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message)
      }
    }
  }
}
