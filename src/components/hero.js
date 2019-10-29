import React from 'react'
import styled from 'styled-components'
import logotype from '../images/logotype.svg'
import PropTypes from 'prop-types'
import { device } from '../utils/devices'
import arrow from '../images/down.svg'
import Div100vh from 'react-div-100vh'

const Wrapper = styled.div`
  height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5vw;
  background: black;
  background-size: cover;
  background-position: center center;
  color: white;
  position: relative;
  box-sizing: border-box;

  @media ${device.laptop}{
    height: 80vh;
  }

  h2 {
    font-size: 24px;
    font-weight: 300;
    position: relative;
    z-index: 1;
    margin-bottom: 4rem;

    @media ${device.laptop}{
      font-size: 60px;
      margin-bottom: 2rem;
    }

    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 3rem;
      background: url(${arrow});
      background-size: 100%;
      width: 20px;
      height: 26px;
      z-index: 2;

      @media ${device.laptop}{
        width: 30px;
        height: 40px;
        top: 5rem;
      }
    }
  }

  p {
    font-weight: 300;
    margin-top: 4rem;
    position: relative;
    z-index: 1;
  }

  .logotype {
    z-index: 1;
    width: 70vw;
    margin: 0 auto;

    @media ${device.laptop}{
      width: 20vw;
    }
  }

  picture {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  a {
    position: relative;
    z-index: 1;
  }
`;

const Hero = ({ title, buttonText, url, image }) => (
  <Div100vh style={{ height: 'calc(100rvh - 74px)', width: '100%' }}>
    <Wrapper data-testid='hero'>
      <img className='logotype' src={logotype} alt='Saint and Center' />
      <picture><img src={image} alt={title} /></picture>
      <div>
        <h2 data-testid='title'>{title}</h2>
      </div>
    </Wrapper>
  </Div100vh>
);

Hero.propTypes = {
  title: PropTypes.string.isRequired
}

export default Hero;
