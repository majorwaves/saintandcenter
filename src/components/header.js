import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import logoBlack from '../images/logo-black.svg'
import logo from '../images/logo.svg'
import Menu from './menu'
import Nav from './nav'
import { Link } from 'gatsby'
import { device } from '../utils/devices'
import Cart from './cart'

const Wrapper = styled.div`
  position: fixed;
  top: ${props => props.bannerOpen ? `calc(2rem + 1.5vw)` : `0` };
  z-index: 100;
`;

const Head = styled.header`
  z-index: 10;
  width: 100vw;
  box-sizing: border-box;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5vw;
  transition: all 0.3s ease-in-out;
  background: ${props => props.background ? `rgb(248,249,244);` : `transparent` };
  z-index: 30;

  @media ${device.laptop}{
    padding: 0 2rem;
  }
`;

const Logo = styled.div`
  width: 24px;
  transition: 0.3s ease-in-out;

  @media ${device.laptop}{
    width: 2vw;
    padding: 1rem 0;
  }

  &:hover {
    transform: rotate(180deg);
  }

  img {
    width: 100%;
    margin: 0;
  }
`;

const CartButton = styled.div`

  span {
    cursor: pointer;
    background: ${props => props.background ? `black` : `white` };
    transition: 0.2s all ease-in-out;
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: ${props => props.background ? `1px solid black` : `1px solid white`};
    color: white;
    font-size: 13px;
    font-weight: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    span {
      opacity: 0.8;
    }
  }
`;

const Header = ({ cart, bannerOpen }) => {

  const [background, setBackground] = useState(false)
  const [navOpen, toggleNav] = useState(false)
  const [cartOpen, toggleCart] = useState(false)

  const listenScrollEvent = e => {
    if(window.scrollY > 400) {
      setBackground(true)
    } else {
      setBackground(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent)
  })

  // const toggleBodyLock = () => {
  //   document.body.classList.toggle('locked')
  // }

  const handleToggleNav = () => {
    // toggleBodyLock()
    toggleCart(false)
    toggleNav(!navOpen)
  }

  return (
    <>
      <Wrapper cartOpen={cartOpen} bannerOpen={bannerOpen}>
      {cart.length > 0 &&
        <Cart open={cartOpen} toggle={toggleCart} cart={cart} />
      }
      <Head data-testid='header' id='header' navOpen={navOpen} background={background}>
        <Menu
          background={background}
          open={navOpen}
          onClick={handleToggleNav}
        />
        <Logo>
          <Link to='/'>
            <img src={background ? logoBlack : logo} alt='Saint and Center' />
          </Link>
        </Logo>
        <CartButton
          background={background}
          data-testid='cart-button'
          onClick={() => toggleCart(!cartOpen)}>
          <span data-testid='header-cart-count'>{cart.length > 0 && cart.length}</span>
        </CartButton>
      </Head>
      </Wrapper>
      <Nav open={navOpen} cartItems={cart.length} />
    </>
  )
}

export default Header;
