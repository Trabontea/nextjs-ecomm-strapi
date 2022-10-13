import { useStateContext } from '../lib/context'
import { CartWrapper, CartStyle, Card } from '../styles/CartStyles'

/* eslint-disable @next/next/no-img-element */
export default function Cart() {
  const { cartItems } = useStateContext()
  return (
    <div>
      <CartWrapper>
        <CartStyle>
          {cartItems.length < 1 && (
            <div>
              <h1>You have more shopping to do </h1>
            </div>
          )}
          {cartItems.length >= 1 &&
            cartItems.map((item, i) => {
              return (
                <Card key={i}>
                  <img
                    src={item.image.data.attributes.formats.small.url}
                    alt={item.title}
                  />
                  <div>
                    <h3>Title</h3>
                    <h3>Price</h3>
                  </div>
                </Card>
              )
            })}
        </CartStyle>
      </CartWrapper>
    </div>
  )
}
