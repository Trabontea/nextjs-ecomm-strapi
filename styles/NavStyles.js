import styled from 'styled-components'

export const NavStyles = styled.nav`
  min-height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;

  a {
    font-size: 1.2rem;
    font-weight: 700;
  }
`

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  div {
    margin-left: 3rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h3 {
    font-size: 0.9rem;
    padding: 0.25em;
  }
  svg {
    font-size: 1em;
  }
`
