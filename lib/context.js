import React, { createContext, useContext, useState } from 'react'

export const ShopContext = createContext()

export const StateContext = ({ children }) => {
  // Add our data for the state
  const [qty, setQty] = useState(0)
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // Increase product quantity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1)
  }

  // Decrease product quantity
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 0
      return prevQty - 1
    })
  }

  // Add Product to Cart
  const onAdd = (product, quantity) => {
    //Total Price
    setTotalPrice((prevTotal) => prevTotal + product.price * quantity)

    // Increase total quantity
    setTotalQuantities((prevTotal) => prevTotal + quantity)

    // Check if the product is already in the cart
    const exist = cartItems.find((item) => item.slug === product.slug)
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? // update just the quantity
              { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      )
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }])
    }
  }

  // Remove Product
  const onRemove = (product) => {
    //Total Price
    setTotalPrice((prevTotal) => prevTotal - product.price)

    // Decrease total quantity
    setTotalQuantities((prevTotal) => prevTotal - 1)

    // Check if the product is already in the cart
    const exist = cartItems.find((item) => item.slug === product.slug)
    //console.log('exist', exist)

    if (exist.quantity === 1) {
      // va fi eliminat din cos
      setCartItems(cartItems.filter((item) => item.slug !== product.slug))
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      )
    }
  }

  return (
    <ShopContext.Provider
      value={{
        qty,
        increaseQty,
        decreaseQty,
        showCart,
        setShowCart,
        cartItems,
        onAdd,
        onRemove,
        totalQuantities,
        totalPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export const useStateContext = () => useContext(ShopContext)
