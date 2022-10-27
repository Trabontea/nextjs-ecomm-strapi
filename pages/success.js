import { useRouter } from 'next/router'
import Image from 'next/image'
import shiba from '../public/shiba.png'
import styled from 'styled-components'
const { motion } = require('framer-motion')

const stripe = require('stripe')(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)
// This function run on server
export async function getServerSideProps(params) {
  // console.log(params.query)
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ['line_items'],
    }
  )
  return { props: { order } }
}

export default function Success({ order }) {
  const route = useRouter()
  console.log('order', order)
  return (
    <Wrapper>
      <Card
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.75 }}
        transition={{ duration: 0.75 }}
      >
        <h1>Thank you {order.customer_details.name} for your order</h1>
        <h2>A confirmation email has been sent to</h2>
        <h2>{order.customer_details.email}</h2>
        <InfoWrapper>
          <Address>
            <h3>Address</h3>
            {Object.entries(order.customer_details.address).map(
              ([key, val]) => (
                <p key={key}>
                  {key}:{val}
                </p>
              )
            )}
          </Address>
          <OrderInfo>
            <h3>Products</h3>
            {order.line_items.data.map((item, i) => (
              <div key={i}>
                <p>
                  <span>Produs:</span> <span>{item.description}</span>
                </p>
                <p>Pret: {item.price.unit_amount / 100}</p>

                <p>
                  <span>Cantitate:</span> <span>{item.quantity}</span>
                </p>

                <p>
                  <span>Suma:</span> <span>{item.amount_total / 100}</span>
                </p>
              </div>
            ))}
            <h2>Transport: {order.shipping_cost.amount_total / 100}</h2>
            <h2>Suma totala: {order.amount_total / 100}</h2>
          </OrderInfo>
        </InfoWrapper>
        <button onClick={() => route.push('/')}>Continue Shopping</button>
        <Image src={shiba} alt="shiba" />
      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0;
  padding: 5em;
`

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 2rem;
  padding: 3rem 1rem;

  button {
    color: white;
    background: var(--primary);
    font-size: 1.2rem;
    padding: 1rem 2rem;
    cursor: pointer;
  }
`

const Address = styled.div`
  font-size: 1rem;
  width: 100%;
`
const OrderInfo = styled.div`
  font-size: 1rem;
  width: 100%;
  div {
    padding-bottom: 1rem;
  }
`
const InfoWrapper = styled.div`
  display: flex;
  max-width: 800px;
  width: 100%;

  justify-content: space-around;
  align-items: center;
  margin: 1rem;
`
