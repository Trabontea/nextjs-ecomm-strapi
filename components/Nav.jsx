import Link from 'next/link'
import { FiShoppingBag } from 'react-icons/fi'
import { NavStyles, NavItems } from '../styles/NavStyles'
import Cart from './Cart'

export default function Nav() {
  return (
    <NavStyles>
      <Link href={'/'}>EComm - Tzoale</Link>
      <NavItems>
        <div>
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <Cart />
    </NavStyles>
  )
}
