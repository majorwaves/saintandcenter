import React, { useState, useEffect } from "react"
import styled from "styled-components"
import logo from "../images/logo-black.svg"
import logotype from "../images/logotype.svg"
import logotypeBlack from "../images/logotype-black.svg"
import Menu from "./menu"
import Nav from "./nav"
import { Link } from "gatsby"
import { device } from "../utils/devices"
import Cart from "./cart"
import PropTypes from "prop-types"

const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
`

const Head = styled.header`
  width: 100vw;
  box-sizing: border-box;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5vw;
  background: ${props =>
    props.background ? `rgb(248,249,244)` : `transparent`};
  z-index: 999;

  @media ${device.laptop} {
    padding: 0 2rem;
  }
`

const Logo = styled.div`
  width: ${props => (props.background ? `24px` : `200px`)};
  transition: 0.3s transform ease-in-out;

  @media ${device.laptop} {
    width: ${props =>
      props.background ? (props.hover ? `20vw` : `1.5vw`) : `20vw`};
    padding: ${props => (props.hover ? `1.3vw 0` : `1rem 0`)};
  }

  img {
    width: 100%;
    height: 100%;
    margin: 0;
  }
`

const CartButton = styled.div`
  span {
    cursor: pointer;
    background: ${props => (props.background ? `black` : `white`)};
    transition: 0.2s all ease-in-out;
    width: 20px;
    height: 20px;
    border-radius: 16px;
    border: ${props =>
      props.background ? `1px solid black` : `1px solid white`};
    color: ${props => (props.background ? `white` : `black`)};
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
`

const Header = ({ cart, bannerOpen, home }) => {
  const [background, setBackground] = useState(home ? false : true)
  const [hover, setHover] = useState(false)
  const [navOpen, toggleNav] = useState(false)
  const [cartOpen, toggleCart] = useState(false)

  const listenScrollEvent = () => {
    if (home) {
      if (window.scrollY > window.innerHeight * 3) {
        setBackground(true)
      } else {
        setBackground(false)
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent)
  })

  const handleToggleNav = () => {
    // toggleBodyLock()
    toggleCart(false)
    toggleNav(!navOpen)

    if (!navOpen && !background) {
      setBackground(true)
    }

    if (home && background && navOpen) {
      setBackground(false)
    }
  }

  return (
    <>
      <Wrapper cartOpen={cartOpen} bannerOpen={bannerOpen}>
        {cart.length > 0 && (
          <Cart open={cartOpen} toggle={toggleCart} cart={cart} />
        )}
        <Head
          data-testid="header"
          id="header"
          navOpen={navOpen}
          background={background}
        >
          <Menu
            background={background}
            open={navOpen}
            onClick={handleToggleNav}
          />
          <Logo
            hover={hover}
            background={background}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Link to="/">
              {hover ? (
                <img src={logotypeBlack} alt="Saint and Center" />
              ) : (
                <img
                  src={background ? logo : logotype}
                  alt="Saint and Center"
                />
              )}
            </Link>
          </Logo>
          <CartButton
            background={background}
            data-testid="cart-button"
            onClick={() => toggleCart(!cartOpen)}
          >
            <span data-testid="header-cart-count">
              {cart.length > 0 && cart.length}
            </span>
          </CartButton>
        </Head>
      </Wrapper>
      <Nav open={navOpen} cartItems={cart.length} />
    </>
  )
}

Header.propTypes = {
  cart: PropTypes.array.isRequired,
  bannerOpen: PropTypes.bool,
  home: PropTypes.bool,
}

export default Header
