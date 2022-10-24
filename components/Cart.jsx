import { useStateContext } from '../lib/context'
import {
  CartWrapper,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
  Checkout,
  Cards,
} from '../styles/CartStyles'
import { Quantity } from '../styles/ProductDetails'
import { FaShoppingCart } from 'react-icons/fa'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'

// Animations Variant
const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
  transition: { delay: 0.4 },
}

const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
}

/* eslint-disable @next/next/no-img-element */
export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } =
    useStateContext()
  return (
    <div>
      <CartWrapper
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowCart(false)}
      >
        <CartStyle
          initial={{ x: '50%' }}
          animate={{ x: '0%' }}
          exit={{ x: '50%' }}
          transition={{ type: 'tween' }}
          onClick={(e) => e.stopPropagation()}
        >
          {cartItems.length < 1 && (
            <EmptyStyle
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'tween' }}
            >
              <h1>You have more shopping to do </h1>
              <FaShoppingCart />
            </EmptyStyle>
          )}
          <Cards layout variants={cards} animate="show" initial="hidden">
            {cartItems.length >= 1 &&
              cartItems.map((item) => {
                return (
                  <Card layout variants={card} key={item.slug}>
                    <img
                      src={item.image.data.attributes.formats.small.url}
                      alt={item.title}
                    />
                    <CardInfo>
                      <h4>{item.title}</h4>
                      <h4>{item.price} Lei</h4>
                      <Quantity>
                        <span>Quantity:&nbsp;</span>
                        <button onClick={() => onRemove(item)}>
                          <AiFillMinusCircle />
                        </button>
                        <p>{item.quantity}</p>
                        <button onClick={() => onAdd(item, 1)}>
                          <AiFillPlusCircle />
                        </button>
                      </Quantity>
                    </CardInfo>
                  </Card>
                )
              })}
          </Cards>
          {cartItems.length >= 1 && (
            <Checkout layout>
              <h3>Subtotal:&nbsp;{totalPrice}&nbsp;Lei</h3>
              <button>Purchase</button>
            </Checkout>
          )}
        </CartStyle>
      </CartWrapper>
    </div>
  )
}
