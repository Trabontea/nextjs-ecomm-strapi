import styled from 'styled-components'

//Animation
const { motion } = require('framer-motion')

export const CartWrapper = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
`

export const CartStyle = styled(motion.div)`
  width: 30%;
  background: #f1f1f1;
  padding: 2rem 3rem;
  overflow-y: scroll;
  position: relative;
  @media only screen and (max-width: 1320px) {
    width: 70%;
  }
`

export const Card = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: white;
  padding: 2rem;
  margin: 2rem 0;
  img {
    max-width: 8rem;
    width: 100%;
    margin-right: 1rem;
  }

  @media only screen and (max-width: 1320px) {
    flex-direction: column;
  }
`

export const CardInfo = styled(motion.div)`
  width: 50%;
  @media only screen and (max-width: 1320px) {
    width: 100%;
  }
  div {
    display: flex;
    flex-direction: space-between;
  }
`
export const EmptyStyle = styled(motion.div)`
  position: absolute;
  top: 0;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  h1 {
    font-size: 2rem;
    padding: 2rem;
  }
  svg {
    font-size: 10rem;
    color: var(--secondary);
  }
`

export const Checkout = styled(motion.div)`
  button {
    background: var(--primary);
    padding: 1rem 2rem;
    width: 100%;
    color: white;
    margin-top: 2rem;
    cursor: pointer;
    border: none;
  }
`

export const Cards = styled(motion.div)``
